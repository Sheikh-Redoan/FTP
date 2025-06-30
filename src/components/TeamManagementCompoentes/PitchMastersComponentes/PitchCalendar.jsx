import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function PitchCalendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  // Define the dates you want to highlight (e.g., February 23 and February 25)
  const eventDates = [new Date(2025, 2, 23), new Date(2025, 2, 25)]; // Note: Months are 0-indexed (0 = January, 1 = February)

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-6  rounded-md flex justify-center", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-lg font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-8 w-8 bg-white p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1 ",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-12  font-normal text-[1rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-12  font-normal aria-selected:opacity-100  relative" 
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected: cn(
          "!bg-primary !text-primary-foreground hover:!bg-primary hover:!text-primary-foreground focus:!bg-gray-300 focus:!text-primary-foreground"
        ),
        day_today: "!bg-blue-600 !text-white",
        day_outside:
          "day-outside text-gray-400 aria-selected:bg-gray-300 aria-selected:text-muted-foreground",
        day_disabled: "text-red-500 opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      modifiers={{
        event: eventDates, // Add the event dates as a modifier
      }}
      components={{
        DayContent: (props) => {
          const isEventDate = eventDates.some(
            (date) => date.getTime() === props.date.getTime()
          );

          return (
            <div className="relative">
              {props.date.getDate()}
              {isEventDate && (
                <div
                  style={{
                    position: "absolute",

                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "6px",
                    height: "6px",
                    backgroundColor: "#4CAF50",
                    borderRadius: "50%",
                  }}
                />
              )}
            </div>
          );
        },
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("h-4 w-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("h-4 w-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  );
}
PitchCalendar.displayName = "Calendar";

export { PitchCalendar };
