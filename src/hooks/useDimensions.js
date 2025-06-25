import { useState, useEffect } from "react";

export const useDimensions = (ref) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (ref.current) {
      // Use ResizeObserver to detect size changes of the container
      const observer = new ResizeObserver((entries) => {
        if (entries[0]) {
          const { width, height } = entries[0].contentRect;
          // Update dimensions state only when they have actually changed
          setDimensions((prevDimensions) => {
            if (prevDimensions.width !== width || prevDimensions.height !== height) {
              return { width, height };
            }
            return prevDimensions;
          });
        }
      });

      observer.observe(ref.current);

      // Cleanup by disconnecting the observer when the component unmounts
      return () => {
        observer.disconnect();
      };
    }
  }, [ref]);

  return dimensions;
};