// This function parses the rich text delta from the notes editor into a format PDF can understand.
const parseNotesToPdf = (pdf, delta) => {
    const leftMargin = 15;
    const topMargin = 35;
    let currentY = topMargin;
    const lineSpacing = 7;
    const listIndent = 7;
    const pageHeight = pdf.internal.pageSize.getHeight();
    const bottomMargin = 20;

    const checkPageBreak = () => {
        if (currentY > pageHeight - bottomMargin) {
            pdf.addPage();
            currentY = topMargin;
        }
    };

    const newLine = (size) => {
        currentY += size + (lineSpacing / 2);
        checkPageBreak();
    };

    if (!delta || !delta.ops) return;

    // Pre-process the Quill delta into an array of lines
    const lines = [];
    let currentLine = { segments: [], attributes: {} };
    delta.ops.forEach(op => {
        if (typeof op.insert !== 'string') return;
        const opLines = op.insert.split('\n');
        opLines.forEach((textSegment, i) => {
            if (textSegment) {
                currentLine.segments.push({ text: textSegment, attributes: op.attributes || {} });
            }
            if (i < opLines.length - 1) {
                lines.push({ ...currentLine, attributes: op.attributes || {} });
                currentLine = { segments: [], attributes: {} };
            }
        });
    });
    if (currentLine.segments.length > 0) {
        lines.push(currentLine);
    }

    let listCounter = 0;
    lines.forEach(line => {
        let startX = leftMargin;
        let defaultFontSize = 12;

        // Handle ordered and unordered lists
        if (line.attributes.list) {
            if (line.attributes.list === 'ordered') {
                listCounter++;
                pdf.text(`${listCounter}.`, startX, currentY);
            } else {
                pdf.text('•', startX, currentY);
            }
            startX += listIndent;
        } else {
            listCounter = 0; // Reset counter for non-list lines
        }

        let currentX = startX;
        // Render each segment of the line with its specific formatting
        line.segments.forEach(segment => {
            const { attributes } = segment;
            let style = '';
            if (attributes.bold) style += 'bold';
            if (attributes.italic) style += 'italic';
            pdf.setFont(undefined, style || 'normal');

            const fontSize = attributes.size ? parseInt(attributes.size, 10) : 12;
            pdf.setFontSize(fontSize);
            if (fontSize > defaultFontSize) defaultFontSize = fontSize;

            const textWidth = pdf.getStringUnitWidth(segment.text) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
            const pageRightMargin = pdf.internal.pageSize.getWidth() - leftMargin;

            if (currentX + textWidth > pageRightMargin) {
                newLine(defaultFontSize);
                currentX = startX;
            }

            pdf.text(segment.text, currentX, currentY);

            if (attributes.underline) {
                pdf.line(currentX, currentY + 1, currentX + textWidth, currentY + 1);
            }

            currentX += textWidth;
        });
        
        newLine(defaultFontSize);
    });
};


// Main function to handle exporting the canvas and notes as a PDF
export const exportToPdf = (stage, notesDelta, canvasWidth, canvasHeight) => {
    if (!stage || !window.jspdf) {
      console.error("PDF export dependencies are not ready.");
      return;
    }

    const { jsPDF } = window.jspdf;
    const stageImage = stage.toDataURL({
      mimeType: "image/png",
      pixelRatio: 2,
    });

    const pdf = new jsPDF({ orientation: "landscape" });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgAspectRatio = canvasWidth / canvasHeight;

    // Calculate image dimensions to fit in the PDF page while maintaining aspect ratio
    let imgWidth, imgHeight;
    if (imgAspectRatio > pdfWidth / pdfHeight) {
      imgWidth = pdfWidth;
      imgHeight = pdfWidth / imgAspectRatio;
    } else {
      imgHeight = pdfHeight;
      imgWidth = pdfHeight * imgAspectRatio;
    }

    const xOffset = (pdfWidth - imgWidth) / 2;
    const yOffset = (pdfHeight - imgHeight) / 2;
    pdf.addImage(stageImage, "PNG", xOffset, yOffset, imgWidth, imgHeight);

    // Add a new page for notes if they exist
    const hasNotes = notesDelta && notesDelta.ops.length > 0 && (notesDelta.ops.length > 1 || notesDelta.ops[0].insert.trim() !== "");
    if (hasNotes) {
      pdf.addPage();
      pdf.setFontSize(20);
      pdf.text("Coaching Points / VAR", 15, 20);
      parseNotesToPdf(pdf, notesDelta);
    }

    pdf.save("training-session.pdf");
};

// Function to handle exporting the canvas as an image
export const exportToImage = (stage, format = "png") => {
    if (!stage) return;
    const mimeType = format === "jpg" ? "image/jpeg" : "image/png";
    const uri = stage.toDataURL({ mimeType, pixelRatio: 2 });
    const link = document.createElement("a");
    link.download = `canvas-export.${format}`;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};