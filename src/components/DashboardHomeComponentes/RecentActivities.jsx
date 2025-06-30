import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import field from "../../assets/imges/Field.png";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const RecentActivities = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <div className="bg-[#E6E6F4] p-6 min-h-[335px] rounded-[16px]">
      <div className="flex justify-between mb-5">
        <h4 className="text-lg text-[#000342] font-medium leading-none ">
          Recent Activities
        </h4>
        <a href="#" className="underline text-[#010792]">
          See More
        </a>
      </div>
      <Carousel
        plugins={[plugin.current]}
        className=" h-auto w-[370px] mx-auto flex items-center justify-center"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="">
                <Card>
                  <CardContent className="w-full flex items-center justify-center">
                    <img className="w-full" src={field} alt="" />
                  </CardContent>
                  <h2 className="text-[#010792] text-center font-roboto text-[16px] font-medium mt-4 w-[271px] mx-auto">
                    Erling Haaland Leads Premier League Top Scorers 2022
                  </h2>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-mt-6" />
        <CarouselNext className="-mt-6" />
      </Carousel>
    </div>
  );
};

export default RecentActivities;
