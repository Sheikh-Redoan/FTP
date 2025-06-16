export async function getModifiedSvgString(svgUrl, bgColor, lineColor) {
  try {
    const response = await fetch(svgUrl);
    let svgText = await response.text();

    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
    const svgElement = svgDoc.documentElement;

    const elements = svgElement.querySelectorAll(
      "path, line, polyline, polygon, rect, circle"
    );
    elements.forEach((element) => {
      if (
        bgColor &&
        element.tagName !== "line" &&
        element.tagName !== "polyline" &&
        element.tagName !== "path"
      ) {
        element.setAttribute("fill", bgColor);
      }
      element.setAttribute("stroke", lineColor);
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