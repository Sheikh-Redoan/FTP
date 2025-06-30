import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { RxCross2 } from "react-icons/rx";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useDrop } from "react-dnd";

const DroppableCarousel = ({
  dropedItem,
  setDropedItem,
  onDrop,
  ItemTypes,
}) => {
  const [items, setItems] = useState(() => {
    const saveItems = localStorage.getItem("dropedItem");
    return saveItems ? JSON.parse(saveItems) : [];
  });

  useEffect(() => {
    localStorage.setItem("dropedItem", JSON.stringify(items));
  }, [items]);

  const [isOver, drop] = useDrop(() => {
    return {
      accept: ItemTypes.CARD,
      drop: (item) => {
        onDrop(item);
        setItems((prevItem) => [...prevItem, item]);
      },
      collect: (monitor) => {
        // console.log("Is over:", monitor.isOver());
        return { isOver: !!monitor.isOver() };
      },
    };
  });

  const handleRemoved = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  return (
    <div>
      <Carousel
        ref={drop}
        opts={{
          align: "center",
        }}
        className="w-full px-20 pt-6"
      >
        <CarouselContent>
          {Array.from({
            length: Math.max(7, Math.min(items.length, 5)),
          }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/5">
              <div className="w-[250px] h-[165px] mx-auto">
                <Card className="cursor-pointer">
                  <CardContent className="flex aspect-square items-center justify-center   w-[250px] h-[165px] mx-auto">
                    <span className="text-3xl flex flex-col justify-center text-center text-[#C4CDD5] w-full h-full">
                      {items[index] ? (
                        <div className="relative">
                          <img
                            className="object-cover w-[250px] h-[165px] rounded-lg"
                            src={items[index].image}
                            alt=""
                          />
                          <div className="absolute  right-0 top-0 z-10 p-1 ">
                            <button
                              onClick={() => handleRemoved(index)}
                              className="text-blue-950 text-lg p-1 rounded-full bg-white/40"
                            >
                              <RxCross2 />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div
                          className={`${
                            isOver
                              ? " border border-dashed border-[#C4CDD5] rounded-lg w-[250px] h-[165px] mx-auto flex flex-col items-center justify-center"
                              : "hidden"
                          }`}
                        >
                          <p className="text-base font-medium">Place here</p>
                          <p className="text-sm">(Drag and Drop)</p>
                        </div>
                      )}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-16 mt-2" />
        <CarouselNext className="mr-16 mt-2" />
      </Carousel>
    </div>
  );
};

export default DroppableCarousel;
