import { useEffect, useState } from "react";
import { Image, Rect, Group } from "react-konva";
import { useImage } from "react-konva-utils";
import { useSvg } from "../../context/SvgContext";

const KonvaPitchImage = ({ pitch, width, height }) => {
  const { svgBgColor } = useSvg();
  const [image] = useImage(pitch.dataUrl);

  const [backgroundDimensions, setBackgroundDimensions] = useState({ width: 0, height: 0, x: 0, y: 0 });
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0, x: 0, y: 0 });
  
  const PADDING = 10;

  useEffect(() => {
    if (image && width > 0 && height > 0) {
      const containerAspectRatio = width / height;
      const imageAspectRatio = image.width / image.height;
      let bgWidth, bgHeight;

      // Calculate the dimensions for the background rectangle to fit the container
      if (containerAspectRatio > imageAspectRatio) {
        bgHeight = height;
        bgWidth = height * imageAspectRatio;
      } else {
        bgWidth = width;
        bgHeight = width / imageAspectRatio;
      }

      const bgX = (width - bgWidth) / 2;
      const bgY = (height - bgHeight) / 2;

      setBackgroundDimensions({
        width: bgWidth,
        height: bgHeight,
        x: bgX,
        y: bgY,
      });
      
      // Calculate the image dimensions based on the background, accounting for padding
      const imgWidth = Math.max(0, bgWidth - PADDING * 2);
      const imgHeight = Math.max(0, bgHeight - PADDING * 2);

      setImageDimensions({
          width: imgWidth,
          height: imgHeight,
          x: bgX + PADDING,
          y: bgY + PADDING,
      });

    }
  }, [image, width, height]);

  return (
    <Group>
      <Rect {...backgroundDimensions} fill={svgBgColor} cornerRadius={5} />
      <Image image={image} {...imageDimensions} cornerRadius={5} />
    </Group>
  );
};

export default KonvaPitchImage;