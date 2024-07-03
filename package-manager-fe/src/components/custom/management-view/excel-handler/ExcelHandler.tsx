import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import UploadService from "@/services/UploadService";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Select } from "@radix-ui/react-select";
import { format, subDays } from "date-fns";
import React from "react";
import { DateRange } from "react-day-picker";

export default function ExcelHandler() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });
  const { exportExcelFile } = UploadService();

  return (
    <div className="relative">
      <Button
        className="mr-2 mb-2"
        onClick={() => {
          setIsDialogOpen(!isDialogOpen);
        }}
      >
        Xuất excel
      </Button>
      <div
        className={`absolute min-h-[100px] p-6 rounded-lg bg-primary-foreground z-10 ${
          isDialogOpen ? "opacity-100" : "hidden opacity-0"
        } transition-all`}
      >
        <div className={cn("grid gap-2")}>
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
                    setDate({
                      from: subDays(new Date(), 7),
                      to: new Date(),
                    });
                  } else if (value === "month") {
                    setDate({
                      from: subDays(new Date(), 30),
                      to: new Date(),
                    });
                  } else if (value === "year") {
                    setDate({
                      from: subDays(new Date(), 365),
                      to: new Date(),
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
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex gap-1 mt-4">
          <Button
            className="flex-1"
            variant={"destructive"}
            onClick={() => {
              setIsDialogOpen(false);
            }}
          >
            Hủy bỏ
          </Button>
          <Button
            className="flex-1"
            variant={"outline"}
            onClick={() => {
              console.log(date);
              exportExcelFile(
                date?.from ? format(date.from, "yyyy-MM-dd") : "",
                date?.to ? format(date.to, "yyyy-MM-dd") : ""
              );
              setIsDialogOpen(false);
            }}
          >
            Xác nhận
          </Button>
        </div>
      </div>
    </div>
  );
}
