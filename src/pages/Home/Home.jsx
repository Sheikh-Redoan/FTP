import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { Stage, Layer, Line } from "react-konva";
import Konva from "konva"; // Import Konva
import { useSvg } from "../../context/SvgContext";
import { useDimensions } from "../../hooks/useDimensions";
import KonvaEquipmentImage from "../../components/common/KonvaEquipmentImage";
import KonvaPitchImage from "../../components/common/KonvaPitchImage";
import KonvaToolbar from "../../components/common/KonvaToolbar";
import { createSvgDataUrl } from "../../utils/svgUtils";
import EditableText from "../../components/common/EditableText";

Konva._fixTextRendering = true;

const GUIDELINE_OFFSET = 5;

const Home = () => {
  const {
    pitch,
    draggedEquipmentSrc,
    setDraggedEquipmentSrc,
    playerColor,
    setAddEquipment,
    setExportFunctions,
    getNotesDeltaFunc,
  } = useSvg();
  const containerRef = useRef(null);
  const stageRef = useRef(null);
  const { width, height } = useDimensions(containerRef);

  const [droppedEquipment, setDroppedEquipment] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [history, setHistory] = useState([[]]);
  const [historyStep, setHistoryStep] = useState(0);
  const [guides, setGuides] = useState([]);

  const textColors = useMemo(
    () => [
      { bg: "#000000", line: "#000000" },
      { bg: "#FFFFFF", line: "#FFFFFF" },
      { bg: "#FDE100", line: "#FDE100" },
      { bg: "#DC052D", line: "#DC052D" },
      { bg: "#22274A", line: "#22274A" },
      { bg: "#6B7280", line: "#6B7280" },
    ],
    []
  );

  const parseDeltaToPdf = (pdf, delta) => {
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
        currentY += size + (lineSpacing/2) ;
        checkPageBreak();
    };

    if (!delta || !delta.ops) return;

    // --- Pre-processing Delta into lines ---
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
                currentLine.attributes = op.attributes || {};
                lines.push(currentLine);
                currentLine = { segments: [], attributes: {} };
            }
        });
    });
    if (currentLine.segments.length > 0) {
        lines.push(currentLine);
    }
    // --- End Pre-processing ---

    let listCounter = 0;
    
    lines.forEach(line => {
        let startX = leftMargin;
        let defaultFontSize = 12;

        if (line.attributes.list) {
            if (line.attributes.list === 'ordered') {
                listCounter++;
                pdf.text(`${listCounter}.`, startX, currentY);
            } else {
                pdf.text(`•`, startX, currentY);
            }
            startX += listIndent;
        } else {
            listCounter = 0; // Reset for non-list lines
        }

        let currentX = startX;

        line.segments.forEach(segment => {
            const attributes = segment.attributes;
            let style = '';
            if (attributes.bold) style += 'bold';
            if (attributes.italic) style += 'italic';
            pdf.setFont(undefined, style || 'normal');

            const fontSize = attributes.size ? parseInt(attributes.size, 10) : 12;
            pdf.setFontSize(fontSize);
            if(fontSize > defaultFontSize) defaultFontSize = fontSize;

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

  const handleExportPDF = useCallback(async () => {
    if (!stageRef.current || !window.jspdf || !getNotesDeltaFunc) {
      console.error("PDF export dependencies are not ready.");
      return;
    }

    const { jsPDF } = window.jspdf;
    const stageImage = stageRef.current.toDataURL({
      mimeType: "image/png",
      pixelRatio: 2,
    });
    const notesDelta = getNotesDeltaFunc();

    const pdf = new jsPDF({ orientation: "landscape" });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgAspectRatio = width / height;
    const pdfAspectRatio = pdfWidth / pdfHeight;

    let imgWidth, imgHeight;
    if (imgAspectRatio > pdfAspectRatio) {
      imgWidth = pdfWidth;
      imgHeight = pdfWidth / imgAspectRatio;
    } else {
      imgHeight = pdfHeight;
      imgWidth = pdfHeight * imgAspectRatio;
    }

    const xOffset = (pdfWidth - imgWidth) / 2;
    const yOffset = (pdfHeight - imgHeight) / 2;
    pdf.addImage(stageImage, "PNG", xOffset, yOffset, imgWidth, imgHeight);

    if (
      notesDelta &&
      notesDelta.ops.length > 0 &&
      (notesDelta.ops.length > 1 || notesDelta.ops[0].insert.trim() !== "")
    ) {
      pdf.addPage();
      pdf.setFontSize(20);
      pdf.text("Coaching Points / VAR", 15, 20);
      parseDeltaToPdf(pdf, notesDelta);
    }

    pdf.save("training-session.pdf");
  }, [stageRef, width, height, getNotesDeltaFunc]);

  const handleExportImage = useCallback(
    (format) => {
      if (!stageRef.current) return;
      const mimeType = format === "jpg" ? "image/jpeg" : "image/png";
      const uri = stageRef.current.toDataURL({ mimeType, pixelRatio: 2 });
      const link = document.createElement("a");
      link.download = `canvas.${format}`;
      link.href = uri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    [stageRef]
  );

  useEffect(() => {
    setExportFunctions({
      png: () => handleExportImage("png"),
      jpg: () => handleExportImage("jpg"),
      pdf: handleExportPDF,
    });
  }, [setExportFunctions, handleExportImage, handleExportPDF]);

  const handleTextColorChange = (colorIndex) => {
    const selectedItem = droppedEquipment.find(
      (item) => item.id === selectedId
    );
    if (!selectedItem || selectedItem.type !== "text") return;

    const newColor = textColors[colorIndex].line;
    const items = droppedEquipment.map((item) =>
      item.id === selectedId ? { ...item, fill: newColor } : item
    );
    setDroppedEquipment(items);
  };

  const handleTextResize = (e) => {
    const newSize = parseInt(e.target.value, 10);
    if (!selectedId) return;

    const items = droppedEquipment.map((item) => {
      if (item.id === selectedId && item.type === "text") {
        return { ...item, fontSize: newSize };
      }
      return item;
    });
    setDroppedEquipment(items);
  };

  const addEquipmentToStage = useCallback(
    (svgContent, type) => {
      const dataUrl = createSvgDataUrl(svgContent);
      const newId = Date.now().toString();

      const newEquipment = {
        id: newId,
        dataUrl,
        x: width / 2 - 50,
        y: height / 2 - 50,
        width: 100,
        height: 100,
        rotation: 0,
        locked: false,
        type: type,
        name: "object",
      };

      setDroppedEquipment((prev) => [...prev, newEquipment]);
      setSelectedId(newId);
    },
    [width, height]
  );

  useEffect(() => {
    setAddEquipment(() => (item, type) => {
      if (type === "text") {
        const newId = Date.now().toString();
        const newText = {
          id: newId,
          x: width / 2 - 100,
          y: height / 2 - 50,
          rotation: 0,
          locked: false,
          name: "object",
          ...item,
        };
        setDroppedEquipment((prev) => [...prev, newText]);
        setSelectedId(newId);
      } else {
        addEquipmentToStage(item, type);
      }
    });
  }, [setAddEquipment, addEquipmentToStage, width, height]);

  useEffect(() => {
    if (
      JSON.stringify(history[historyStep]) !== JSON.stringify(droppedEquipment)
    ) {
      const newHistory = history.slice(0, historyStep + 1);
      setHistory([...newHistory, droppedEquipment]);
      setHistoryStep(newHistory.length);
    }
  }, [droppedEquipment, history, historyStep]);

  const handleDrop = (e) => {
    e.preventDefault();
    if (!draggedEquipmentSrc) return;

    stageRef.current.setPointersPositions(e);
    const position = stageRef.current.getPointerPosition();
    const dataUrl = createSvgDataUrl(draggedEquipmentSrc.content);
    const newId = Date.now().toString();

    const newEquipment = {
      id: newId,
      dataUrl,
      x: position.x,
      y: position.y,
      width: 100,
      height: 100,
      rotation: 0,
      locked: false,
      type: draggedEquipmentSrc.type,
      text: draggedEquipmentSrc.text,
      name: "object",
    };

    setDroppedEquipment((prev) => [...prev, newEquipment]);
    setDraggedEquipmentSrc(null);
    setSelectedId(newId);
  };

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedId(null);
    }
  };

  const handleItemChange = (newAttrs) => {
    const items = droppedEquipment.map((item) =>
      item.id === newAttrs.id ? newAttrs : item
    );
    setDroppedEquipment(items);
  };

  const handleSelectEquipment = (id) => {
    setSelectedId(id);
    const equipment = droppedEquipment.find((item) => item.id === id);
    if (equipment && equipment.type === "player" && !equipment.locked) {
      const newSvgContent = `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" fill="${playerColor}" stroke="white" stroke-width="2"/><text x="50" y="55" text-anchor="middle" fill="white" font-size="30">${equipment.text}</text></svg>`;
      const newDataUrl = createSvgDataUrl(newSvgContent);

      const updatedEquipment = droppedEquipment.map((item) => {
        if (item.id === id) {
          return { ...item, dataUrl: newDataUrl };
        }
        return item;
      });
      setDroppedEquipment(updatedEquipment);
    }
  };

  const selectedEquipment = droppedEquipment.find(
    (item) => item.id === selectedId
  );

  const handleUndo = () => {
    if (historyStep > 0) {
      const newHistoryStep = historyStep - 1;
      setHistoryStep(newHistoryStep);
      setDroppedEquipment(history[newHistoryStep]);
      setSelectedId(null);
    }
  };

  const handleRedo = () => {
    if (historyStep < history.length - 1) {
      const newHistoryStep = historyStep + 1;
      setHistoryStep(newHistoryStep);
      setDroppedEquipment(history[newHistoryStep]);
      setSelectedId(null);
    }
  };

  const handleDuplicate = () => {
    if (selectedEquipment && !selectedEquipment.locked) {
      const newId = Date.now().toString();
      const duplicatedItem = {
        ...selectedEquipment,
        id: newId,
        x: selectedEquipment.x + 20,
        y: selectedEquipment.y + 20,
      };
      setDroppedEquipment((prev) => [...prev, duplicatedItem]);
      setSelectedId(newId);
    }
  };

  const handleDelete = () => {
    if (selectedEquipment && !selectedEquipment.locked) {
      setDroppedEquipment((prev) =>
        prev.filter((item) => item.id !== selectedId)
      );
      setSelectedId(null);
    }
  };

  const handleLockUnlock = () => {
    if (selectedEquipment) {
      setDroppedEquipment((prev) =>
        prev.map((item) =>
          item.id === selectedId ? { ...item, locked: !item.locked } : item
        )
      );
    }
  };

  const handleRotate = () => {
    if (selectedEquipment && !selectedEquipment.locked) {
      setDroppedEquipment((prev) =>
        prev.map((item) =>
          item.id === selectedId
            ? { ...item, rotation: (item.rotation + 45) % 360 }
            : item
        )
      );
    }
  };
  const getLineGuideStops = (skipShape) => {
    const vertical = [0, width / 2, width];
    const horizontal = [0, height / 2, height];

    stageRef.current.find(".object").forEach((guideItem) => {
      if (guideItem === skipShape) {
        return;
      }
      const box = guideItem.getClientRect();
      vertical.push(box.x, box.x + box.width, box.x + box.width / 2);
      horizontal.push(box.y, box.y + box.height, box.y + box.height / 2);
    });
    return {
      vertical: vertical.flat(),
      horizontal: horizontal.flat(),
    };
  };

  const getObjectSnappingEdges = (node) => {
    const box = node.getClientRect();
    const absPos = node.absolutePosition();

    return {
      vertical: [
        {
          guide: Math.round(box.x),
          offset: Math.round(absPos.x - box.x),
          snap: "start",
        },
        {
          guide: Math.round(box.x + box.width / 2),
          offset: Math.round(absPos.x - box.x - box.width / 2),
          snap: "center",
        },
        {
          guide: Math.round(box.x + box.width),
          offset: Math.round(absPos.x - box.x - box.width),
          snap: "end",
        },
      ],
      horizontal: [
        {
          guide: Math.round(box.y),
          offset: Math.round(absPos.y - box.y),
          snap: "start",
        },
        {
          guide: Math.round(box.y + box.height / 2),
          offset: Math.round(absPos.y - box.y - box.height / 2),
          snap: "center",
        },
        {
          guide: Math.round(box.y + box.height),
          offset: Math.round(absPos.y - box.y - box.height),
          snap: "end",
        },
      ],
    };
  };

  const getGuides = (lineGuideStops, itemBounds) => {
    const resultV = [];
    const resultH = [];

    lineGuideStops.vertical.forEach((lineGuide) => {
      itemBounds.vertical.forEach((itemBound) => {
        const diff = Math.abs(lineGuide - itemBound.guide);
        if (diff < GUIDELINE_OFFSET) {
          resultV.push({
            lineGuide: lineGuide,
            diff: diff,
            snap: itemBound.snap,
            offset: itemBound.offset,
          });
        }
      });
    });

    lineGuideStops.horizontal.forEach((lineGuide) => {
      itemBounds.horizontal.forEach((itemBound) => {
        const diff = Math.abs(lineGuide - itemBound.guide);
        if (diff < GUIDELINE_OFFSET) {
          resultH.push({
            lineGuide: lineGuide,
            diff: diff,
            snap: itemBound.snap,
            offset: itemBound.offset,
          });
        }
      });
    });

    const guides = [];
    const minV = resultV.sort((a, b) => a.diff - b.diff)[0];
    const minH = resultH.sort((a, b) => a.diff - b.diff)[0];

    if (minV) {
      guides.push({
        lineGuide: minV.lineGuide,
        offset: minV.offset,
        orientation: "V",
        snap: minV.snap,
      });
    }
    if (minH) {
      guides.push({
        lineGuide: minH.lineGuide,
        offset: minH.offset,
        orientation: "H",
        snap: minH.snap,
      });
    }
    return guides;
  };

  const handleDragStart = (e) => {
    const id = e.target.id();
    setDroppedEquipment((prev) => {
      const items = [...prev];
      const item = items.find((i) => i.id === id);
      const index = items.indexOf(item);
      items.splice(index, 1);
      items.push(item);
      return items;
    });
  };

  const handleDragMove = (e) => {
    const target = e.target;
    const lineGuideStops = getLineGuideStops(target);
    const itemBounds = getObjectSnappingEdges(target);
    const newGuides = getGuides(lineGuideStops, itemBounds);

    if (newGuides.length) {
      const absPos = target.absolutePosition();
      newGuides.forEach((lg) => {
        switch (lg.orientation) {
          case "V": {
            absPos.x = lg.lineGuide + lg.offset;
            break;
          }
          case "H": {
            absPos.y = lg.lineGuide + lg.offset;
            break;
          }
          default:
            break;
        }
      });
      target.absolutePosition(absPos);
      setGuides(newGuides);
    }
  };

  const handleDragEnd = (e) => {
    setGuides([]);
    const newAttrs = {
      id: e.target.id(),
      x: e.target.x(),
      y: e.target.y(),
    };
    const items = droppedEquipment.slice();
    const item = items.find((i) => i.id === newAttrs.id);
    const index = items.indexOf(item);
    items[index] = { ...item, ...newAttrs };
    setDroppedEquipment(items);
  };

  return (
    <div
      className="w-full h-[80vh] flex justify-center items-center bg-white relative"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      ref={containerRef}
    >
      <Stage
        width={width}
        height={height}
        ref={stageRef}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
        className="absolute top-0 left-0"
      >
        <Layer>
          {pitch && (
            <KonvaPitchImage pitch={pitch} width={width} height={height} />
          )}
          {droppedEquipment.map((item) => {
            if (item.type === "text") {
              return (
                <EditableText
                  key={item.id}
                  shapeProps={item}
                  isSelected={item.id === selectedId}
                  onSelect={() => handleSelectEquipment(item.id)}
                  onChange={handleItemChange}
                  onTransform={handleItemChange}
                  onDragStart={handleDragStart}
                  onDragMove={handleDragMove}
                  onDragEnd={handleDragEnd}
                />
              );
            }
            return (
              <KonvaEquipmentImage
                key={item.id}
                equipment={item}
                isSelected={item.id === selectedId}
                onSelect={() => handleSelectEquipment(item.id)}
                onTransform={handleItemChange}
                onDragStart={handleDragStart}
                onDragMove={handleDragMove}
                onDragEnd={handleDragEnd}
              />
            );
          })}
        </Layer>
        <Layer>
          {guides.map((guide, i) => (
            <Line
              key={i}
              points={
                guide.orientation === "H"
                  ? [-6000, 0, 6000, 0]
                  : [0, -6000, 0, 6000]
              }
              stroke="rgb(0, 161, 255)"
              strokeWidth={1}
              dash={[4, 6]}
              x={guide.orientation === "V" ? guide.lineGuide : 0}
              y={guide.orientation === "H" ? guide.lineGuide : 0}
            />
          ))}
        </Layer>
      </Stage>

      <KonvaToolbar
        selectedEquipment={selectedEquipment}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onDuplicate={handleDuplicate}
        onDelete={handleDelete}
        onLockUnlock={handleLockUnlock}
        onRotate={handleRotate}
        canUndo={historyStep > 0}
        canRedo={historyStep < history.length - 1}
        onTextColorChange={handleTextColorChange}
        textColors={textColors}
        onTextResize={handleTextResize}
      />

      {!pitch && droppedEquipment.length === 0 && (
        <h1 className="text-3xl font-bold text-gray-400">
          Select a pitch or drag equipment here
        </h1>
      )}
    </div>
  );
};

export default Home;