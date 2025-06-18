// src/components/common/KonvaLine.jsx
import { Arrow } from "react-konva";

const KonvaLine = ({ from, to, color }) => {
  const getConnectorPoints = (from, to) => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    let angle = Math.atan2(-dy, dx);

    const radius = 20; // Adjust as needed

    return [
      from.x + -radius * Math.cos(angle + Math.PI),
      from.y + radius * Math.sin(angle + Math.PI),
      to.x + -radius * Math.cos(angle),
      to.y + radius * Math.sin(angle),
    ];
  };

  if (!from || !to) {
    return null;
  }

  const points = getConnectorPoints(from, to);

  return <Arrow points={points} fill={color} stroke={color} strokeWidth={2} />;
};

export default KonvaLine;