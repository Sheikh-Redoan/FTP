// src/pages/Home/Home.jsx
import { useState, useRef, useEffect } from "react";
import { Stage, Layer, Image, Transformer } from "react-konva"; // Import Transformer
import { useImage } from "react-konva-utils";
import { useSvg } from "../../context/SvgContext";
import { ReactSVG } from "react-svg";

// Separate component for Konva Image with proper loading and styling
const KonvaEquipmentImage = ({
  equipment,
  onDragEnd,
  isSelected,
  onSelect,
  onTransform,
}) => {
  const [image, status] = useImage(equipment.dataUrl);
  const shapeRef = useRef();
  const trRef = useRef();

  // Use local state for width and height, initialized from equipment prop
  // These will be updated by the transformer and also by parent prop changes
  const [currentWidth, setCurrentWidth] = useState(equipment.width);
  const [currentHeight, setCurrentHeight] = useState(equipment.height);

  // Effect to set initial dimensions when the image loads
  // and if they haven't been set by the parent (e.g., for a new drop)
  useEffect(() => {
    if (status === "loaded" && image) {
      if (currentWidth === undefined || currentHeight === undefined) {
        const aspectRatio = image.width / image.height;
        const baseSize = 50; // Initial size
        const width = aspectRatio > 1 ? baseSize : baseSize * aspectRatio;
        const height = aspectRatio > 1 ? baseSize / aspectRatio : baseSize;
        setCurrentWidth(width);
        setCurrentHeight(height);
      }
    }
  }, [status, image, currentWidth, currentHeight]); // Depend on current dimensions to avoid re-calculating if already set

  // Effect to synchronize local state with parent's equipment prop
  // This is crucial when the parent's `droppedEquipment` state updates after `onTransformEnd`
  useEffect(() => {
    if (equipment.width !== undefined && equipment.width !== currentWidth) {
      setCurrentWidth(equipment.width);
    }
    if (equipment.height !== undefined && equipment.height !== currentHeight) {
      setCurrentHeight(equipment.height);
    }
  }, [equipment.width, equipment.height]); // Only re-run when equipment dimensions from parent change


  useEffect(() => {
    if (isSelected && shapeRef.current && trRef.current) {
      // Attach transformer with a small delay to ensure everything is ready
      const timer = setTimeout(() => {
        if (shapeRef.current && trRef.current) {
          trRef.current.nodes([shapeRef.current]);
          trRef.current.getLayer().batchDraw();
        }
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [isSelected, currentWidth, currentHeight]); // Re-attach if selection or dimensions change

  // Only render if image is loaded and dimensions are defined
  if (status !== "loaded" || currentWidth === undefined || currentHeight === undefined) {
    return null;
  }

  return (
    <>
      <Image
        image={image}
        x={equipment.x}
        y={equipment.y}
        width={currentWidth} // Use local state for width
        height={currentHeight} // Use local state for height
        rotation={equipment.rotation || 0}
        draggable
        onDragEnd={onDragEnd}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        // Important for transformer positioning:
        offsetX={currentWidth / 2}
        offsetY={currentHeight / 2}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // Prevent making the image too small
            if (newBox.width < 20 || newBox.height < 20) {
              return oldBox;
            }
            return newBox;
          }}
          // Make handles clearly visible:
          anchorSize={12}
          borderEnabled={true}
          borderStroke="#2d8cf0"
          borderStrokeWidth={2}
          anchorStroke="#2d8cf0"
          anchorFill="#ffffff"
          anchorCornerRadius={6}
          rotateEnabled={true}
          onTransformEnd={() => {
            const node = shapeRef.current;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();

            // Calculate new dimensions
            const newWidth = Math.max(20, node.width() * scaleX);
            const newHeight = Math.max(20, node.height() * scaleY);

            // Reset scale of the Konva node after transformation
            node.scaleX(1);
            node.scaleY(1);

            // Update local state immediately
            setCurrentWidth(newWidth);
            setCurrentHeight(newHeight);

            // Notify parent of transform with new dimensions
            onTransform({
              x: node.x(),
              y: node.y(),
              width: newWidth,
              height: newHeight,
              rotation: node.rotation(),
            });
          }}
        />
      )}
    </>
  );
};

const Home = () => {
  const {
    selectedSvg,
    svgBgColor,
    svgLineColor,
    draggedEquipmentSrc,
    setDraggedEquipmentSrc,
  } = useSvg();
  const stageRef = useRef(null);
  const [droppedEquipment, setDroppedEquipment] = useState([]);
  const containerRef = useRef(null);
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [selectedId, selectShape] = useState(null); // State to hold the ID of the selected equipment

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Function to modify SVG DOM before injection for PITCH SVGs in the Home component
  const beforeInjection = (svg) => {
    const elements = svg.querySelectorAll(
      "path, line, polyline, polygon, rect, circle"
    );
    elements.forEach((element) => {
      element.setAttribute("stroke", svgLineColor);
    });
  };

  // This function now just takes the SVG content string and creates a data URL
  const createSvgDataUrl = (svgContent) => {
    return `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();

    if (!draggedEquipmentSrc || !stageRef.current || !containerRef.current)
      return;

    // const stage = stageRef.current;
    const containerRect = containerRef.current.getBoundingClientRect();

    // Calculate drop position relative to the stage
    const x = e.clientX - containerRect.left;
    const y = e.clientY - containerRect.top;

    // Use the pre-processed SVG content string from draggedEquipmentSrc
    const dataUrl = createSvgDataUrl(draggedEquipmentSrc.content);

    const newEquipmentId = Date.now().toString(); // Generate ID once
    setDroppedEquipment((prevEquipment) => [
      ...prevEquipment,
      {
        src: draggedEquipmentSrc.src, // Keep original src for reference
        dataUrl: dataUrl, // Use the modified data URL for Konva
        x: x,
        y: y,
        id: newEquipmentId,
        bgColor: draggedEquipmentSrc.bgColor,
        lineColor: draggedEquipmentSrc.lineColor,
        // Initial width/height will be set by KonvaEquipmentImage's internal logic
        width: undefined,
        height: undefined,
        rotation: 0,
      },
    ]);
    setDraggedEquipmentSrc(null); // Clear the dragged source after dropping
    selectShape(newEquipmentId); // Select the newly dropped shape immediately
  };

  const handleEquipmentDragEnd = (e, id) => {
    const node = e.target;
    const newDroppedEquipment = droppedEquipment.map((equipment) => {
      if (equipment.id === id) {
        return {
          ...equipment,
          x: node.x(),
          y: node.y(),
          // Keep current width/height/rotation as they might have been set by transformer
          width: equipment.width,
          height: equipment.height,
          rotation: equipment.rotation,
        };
      }
      return equipment;
    });
    setDroppedEquipment(newDroppedEquipment);
  };

  const handleEquipmentTransform = (id, newAttrs) => {
    setDroppedEquipment((prevEquipment) =>
      prevEquipment.map((equipment) => {
        if (equipment.id === id) {
          return {
            ...equipment,
            ...newAttrs, // Apply new x, y, width, height, rotation
          };
        }
        return equipment;
      })
    );
  };

  const checkDeselect = (e) => {
    // deselect when clicked on empty area of the stage
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null); // Deselect
    } else if (e.target.attrs && e.target.attrs.id) {
      // If clicking on an equipment image, select it
      selectShape(e.target.attrs.id);
    }
  };

  return (
    <div
      className="w-full h-[90vh] flex justify-center items-center bg-[#ffffff] relative"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      ref={containerRef}
    >
      {/* Pitch Display (background layer) */}
      {selectedSvg && (
        <div
          className="p-[10px] rounded-lg shadow-lg absolute"
          style={{
            backgroundColor: svgBgColor,
            maxWidth: "calc(100% - 200px)", // Adjusted for sidebar width if needed
            maxHeight: "calc(100% - 100px)", // Adjusted for any header/footer
            width: "auto",
            height: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 0, // Pitch is at the lowest Z-index
          }}
        >
          <ReactSVG
            src={selectedSvg.component}
            beforeInjection={beforeInjection}
            wrapper="div"
            className="w-full h-full"
            style={{
              width: "auto",
              height: "auto",
            }}
          />
        </div>
      )}

      {/* Konva Stage for draggable and transformable equipment (foreground layer) */}
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{ zIndex: 10 }} // Ensure Konva layer is above the pitch
      >
        <Stage
          width={containerDimensions.width}
          height={containerDimensions.height}
          ref={stageRef}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 10,
            // Temporary background for debugging:
            // backgroundColor: "rgba(0, 100, 255, 0.1)",
          }}
        >
          <Layer>
            {droppedEquipment.map((equipment) => (
              <KonvaEquipmentImage
                key={equipment.id}
                equipment={equipment}
                onDragEnd={(e) => handleEquipmentDragEnd(e, equipment.id)}
                isSelected={equipment.id === selectedId}
                onSelect={() => selectShape(equipment.id)}
                onTransform={(newAttrs) =>
                  handleEquipmentTransform(equipment.id, newAttrs)
                }
              />
            ))}
          </Layer> 
        </Stage>
      </div>

      {/* Initial message (only visible if no pitch and no equipment are present) */}
      {!selectedSvg && droppedEquipment.length === 0 && (
        <h1 className="text-3xl font-bold text-red-600 underline absolute z-0">
          Select an SVG from the sidebar or drag equipment here
        </h1>
      )}
    </div>
  );
};

export default Home;