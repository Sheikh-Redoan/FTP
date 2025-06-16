export async function getModifiedSvgString(svgUrl, _bgColor, lineColor) {
  try {
    const response = await fetch(svgUrl);
    let svgText = await response.text();

    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
    const svgElement = svgDoc.documentElement;

    // Find the first <rect> element (the background) and make it transparent.
    const backgroundRect = svgElement.querySelector('rect');
    if (backgroundRect) {
      backgroundRect.setAttribute('fill', 'transparent');
    }

    // Find all line-like elements and set their stroke color.
    const lineElements = svgElement.querySelectorAll("path, line, polyline, circle");
    lineElements.forEach(element => {
      if (lineColor) {
        element.setAttribute("stroke", lineColor);
        // Ensure paths that are lines are not filled by the browser's default.
        if (element.getAttribute('fill') !== 'none') {
            element.setAttribute('fill', 'transparent');
        }
      }
    });

    const serializer = new XMLSerializer();
    return serializer.serializeToString(svgDoc);
  } catch (error) {
    console.error("Error modifying SVG:", error);
    return `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="20" fill="red"/><text x="10" y="10" font-size="8" fill="white" text-anchor="middle" alignment-baseline="middle">Error</text></svg>`;
  }
}

export const getShapeSvgString = (type, bgColor, lineColor) => {
  let svgContent = "";
  const size = 100;
  const strokeWidth = 5;

  switch (type) {
    case "filledRectangle":
      svgContent = `<rect x="${strokeWidth / 2}" y="${
        strokeWidth / 2
      }" width="${size - strokeWidth}" height="${
        size - strokeWidth
      }" fill="${bgColor}" stroke="${lineColor}" stroke-width="${strokeWidth}"/>`;
      break;
    case "rectangle":
      svgContent = `<rect x="${strokeWidth / 2}" y="${
        strokeWidth / 2
      }" width="${size - strokeWidth}" height="${
        size - strokeWidth
      }" fill="none" stroke="${lineColor}" stroke-width="${strokeWidth}"/>`;
      break;
    // ... add other shape cases here
    default:
      svgContent = `<rect width="${size}" height="${size}" fill="none" stroke="red"/>`;
  }
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">${svgContent}</svg>`;
};

export const createSvgDataUrl = (svgContent) => {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`;
};