export async function getModifiedSvgString(svgUrl, _bgColor, lineColor) {
  try {
    const response = await fetch(svgUrl);
    let svgText = await response.text();

    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
    const svgElement = svgDoc.documentElement;

    const backgroundRect = svgElement.querySelector("rect");
    if (backgroundRect) {
      backgroundRect.setAttribute("fill", "transparent");
    }

    const lineElements = svgElement.querySelectorAll(
      "path, line, polyline, circle"
    );
    lineElements.forEach((element) => {
      if (lineColor) {
        element.setAttribute("stroke", lineColor);
        if (element.getAttribute("fill") !== "none") {
          element.setAttribute("fill", "transparent");
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
  const color = bgColor;

  const shapePaths = {
    rectangle: `<rect x="${strokeWidth / 2}" y="${
      strokeWidth / 2
    }" width="${size - strokeWidth}" height="${
      size - strokeWidth
    }" fill="${color}" stroke="${color}" stroke-width="${strokeWidth}"/>`,
    hexagon: `<polygon points="25,5 75,5 95,50 75,95 25,95 5,50" fill="${color}" stroke="${color}" stroke-width="${strokeWidth}"/>`,
    polygon: `<polygon points="50,5 95,35 85,95 15,95 5,35" fill="${color}" stroke="${color}" stroke-width="${strokeWidth}"/>`,
    circle: `<circle cx="50" cy="50" r="${
      size / 2 - strokeWidth
    }" fill="${color}" stroke="${color}" stroke-width="${strokeWidth}"/>`,
    diamond: `<polygon points="50,5 95,50 50,95 5,50" fill="${color}" stroke="${color}" stroke-width="${strokeWidth}"/>`,
    triangle: `<polygon points="50,5 95,95 5,95" fill="${color}" stroke="${color}" stroke-width="${strokeWidth}"/>`,
  };

  const shapeType = type.replace(/filled/i, "").toLowerCase();
  
  svgContent =
    shapePaths[shapeType] ||
    `<rect width="${size}" height="${size}" fill="red"/>`;

  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">${svgContent}</svg>`;
};

export async function getColoredSvgString(svgUrl, fillColor, strokeColor) {
  try {
    const response = await fetch(svgUrl);
    let svgText = await response.text();

    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
    const svgElement = svgDoc.documentElement;

    const width = svgElement.getAttribute('width');
    const height = svgElement.getAttribute('height');

    // Set viewBox if it doesn't exist, using width/height
    if (!svgElement.getAttribute('viewBox') && width && height) {
      svgElement.setAttribute('viewBox', `0 0 ${width} ${height}`);
    }
    
    // Set width and height to 100% to make the SVG fluid
    svgElement.setAttribute('width', '100%');
    svgElement.setAttribute('height', '100%');

    const allElements = svgElement.querySelectorAll(
      "path, line, polyline, polygon, rect, circle"
    );
    allElements.forEach((element) => {
      if (fillColor) {
        element.setAttribute("fill", fillColor);
      }
      if (strokeColor) {
        element.setAttribute("stroke", strokeColor);
      }
    });

    const serializer = new XMLSerializer();
    return serializer.serializeToString(svgDoc);
  } catch (error) {
    console.error("Error coloring SVG:", error);
    return `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="20" fill="red"/><text x="10" y="10" font-size="8" fill="white" text-anchor="middle" alignment-baseline="middle">Error</text></svg>`;
  }
}

export const getSvgDimensions = (svgContent) => {
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgContent, "image/svg+xml");
    const svgElement = svgDoc.documentElement;
    const viewBox = svgElement.getAttribute("viewBox");
    if (viewBox) {
        const parts = viewBox.split(/[\s,]+/);
        return { width: parseInt(parts[2], 10) || 100, height: parseInt(parts[3], 10) || 100 };
    }
    const width = svgElement.getAttribute("width");
    const height = svgElement.getAttribute("height");
    return { width: parseInt(width, 10) || 100, height: parseInt(height, 10) || 100 };
};

export const createSvgDataUrl = (svgContent) => {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`;
};