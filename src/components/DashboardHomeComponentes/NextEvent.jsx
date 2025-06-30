import React, { useEffect, useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const NextEvent = () => {
  const [nextEvent, setNextEvent] = useState([]);

  useEffect(() => {
    fetch("/Api/nextEvent.json")
      .then((res) => res.json())
      .then((data) => {
        setNextEvent(data);
      });
  }, []);

  return (
    <div className="bg-[#E6E6F4] p-4 rounded-[16px]">
      <ScrollArea className="h-[335px]">
        <div className="p-4">
          <h4 className="mb-4 text-lg text-[#000342] font-medium leading-none">
            Next Event
          </h4>
          {nextEvent.map((event, index) => (
            <div key={index}>
              <div className="grid grid-cols-12">
                <div className="col-span-2">
                  <div className="text-[#010792] font-roboto text-[18px] font-medium leading-normal">
                    {event.time}
                  </div>
                  <div className="text-[#919EAB] font-roboto text-[16px] font-normal leading-normal">
                    {event.date}
                  </div>
                </div>
                <div className="col-span-7">
                  <div className="text-[#010792] font-roboto text-[18px] font-medium leading-normal">
                    {event.title}
                  </div>
                  <div className="text-[#919EAB] font-roboto text-[16px] font-normal leading-normal">
                    {event.location}
                  </div>
                </div>
                <div className="col-span-3 flex items-center">
                  <div className="text-[#919EAB] font-roboto text-[16px] font-normal leading-normal">
                    {event.name}
                  </div>
                </div>
              </div>
              <Separator className="my-2 bg-gray-300" />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default NextEvent;
