import { useEffect, useState } from "react";
import { Image } from "react-konva";
import { useImage } from "react-konva-utils";

const KonvaPitchImage = ({ pitch, width, height }) => {
  const [image] = useImage(pitch.dataUrl);
  const [imageSize, setImageSize] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (image) {
      const containerAspectRatio = width / height;
      const imageAspectRatio = image.width / image.height;
      let newWidth, newHeight;

      if (containerAspectRatio > imageAspectRatio) {
        newHeight = height;
        newWidth = height * imageAspectRatio;
      } else {
        newWidth = width;
        newHeight = width / imageAspectRatio;
      }

      setImageSize({
        width: newWidth,
        height: newHeight,
        x: (width - newWidth) / 2,
        y: (height - newHeight) / 2,
      });
    }
  }, [image, width, height]);

  return <Image image={image} {...imageSize} />;
};

export default KonvaPitchImage;