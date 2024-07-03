"use client";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format, subDays } from "date-fns";
import * as React from "react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { setDateQuery } from "@/redux/slices/packageSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export function DateRangePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: subDays(new Date(), 30), 
    to: new Date(),
  });

  useEffect(() => {
    dispatch(
      setDateQuery({
        start: format(subDays(new Date(), 30), "yyyy-MM-dd"),
        end: format(new Date().toISOString(), "yyyy-MM-dd"),
      })
    );
  }, []);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="flex w-auto flex-col space-y-2 p-2"
        >
          <Select
            onValueChange={(value) => {
              if (value === "week") {
                setDate({ from: subDays(new Date(), 7), to: new Date() });
                setDateQuery({
                  start: format(subDays(new Date(), 7), "yyyy-MM-dd"),
                  end: format(new Date(), "yyyy-MM-dd"),
                });
              } else if (value === "month") {
                setDate({ from: subDays(new Date(), 30), to: new Date() });
                setDateQuery({
                  start: format(subDays(new Date(), 30), "yyyy-MM-dd"),
                  end: format(new Date(), "yyyy-MM-dd"),
                });
              } else if (value === "year") {
                setDate({ from: subDays(new Date(), 365), to: new Date() });
                setDateQuery({
                  start: format(subDays(new Date(), 365), "yyyy-MM-dd"),
                  end: format(new Date(), "yyyy-MM-dd"),
                });
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="week">7 ngày trước</SelectItem>
              <SelectItem value="month">30 ngày trước</SelectItem>
              <SelectItem value="year">1 năm trước</SelectItem>
            </SelectContent>
          </Select>
          <div className="rounded-md border">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={(e) => {
                setDate({ from: e?.from, to: e?.to });
              }}
              numberOfMonths={2}
            />
          </div>
          <Button
            onClick={() => {
              dispatch(
                setDateQuery({
                  start: format(date?.from || "", "yyyy-MM-dd"),
                  end: format(date?.to || "", "yyyy-MM-dd"),
                })
              );
              setOpen(false);
            }}
          >
            Xác nhận
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
