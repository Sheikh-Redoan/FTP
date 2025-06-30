import React from "react";
import { useDrag } from "react-dnd";
import { GoHeartFill } from "react-icons/go";

const DraggableCard = ({
  id,
  image,
  name,
  category,
  focus,
  difficulty_level,
  progressions,
  description,
  duration,
  isFavorite,
  handleFavorite,
  ItemTypes,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: {
      id,
      image,
      name,
      category,
      focus,
      difficulty_level,
      progressions,
      description,
      duration,
      isFavorite,
    },
    collect: (monitor) => {
      // console.log('monitor', monitor.isDragging())
      return { isDragging: !!monitor.isDragging() };
    },
  });

  return (
    <div draggable ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div className="relative top-0 left-0 cursor-move">
        <div>
          <img src={image} alt="" />
        </div>

        <div className="absolute right-0 bottom-0 z-10 p-4">
          <button
            onClick={() => handleFavorite(id)}
            className="border border-transparent p-2 bg-[#EDEBF6] bg-opacity-60 rounded-full"
          >
            <GoHeartFill
              size={24}
              className={
                isFavorite.some((fov) => fov.id === id)
                  ? "text-[#4D37A4]"
                  : "text-gray-400"
              }
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DraggableCard;
