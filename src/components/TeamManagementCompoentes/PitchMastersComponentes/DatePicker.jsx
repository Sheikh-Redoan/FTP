"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const DatePickerDemo = () => {
  const [date, setDate] = useState();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "flex items-center justify-between border-none bg-[#F3F4F7] hover:bg-[#F3F4F7]rounded-md outline-none px-5 py-8",
            !date && "text-muted-foreground"
          )}
        >
          <span>{date ? format(date, "PPP") : "Pick a date"}</span>
          <CalendarIcon className="ml-2" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePickerDemo;
