import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import React from "react";

export default function CustomDatePicker({
  clear,
  onChange,
}: {
  clear?: boolean;
  onChange: (date: Date | undefined) => void;
}) {
  const [date, setDate] = React.useState<Date>();
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(false);

  React.useEffect(() => {
    if (clear === true) {
      setDate(undefined);
      setSelected(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clear]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(e) => {
            setDate(e);
            setSelected(true);
          }}
          initialFocus
        />

        <Button
          className="w-full"
          onClick={() => {
            if (selected) {
              onChange(date);
            }
            setOpen(false);
          }}
        >
          Xác nhận
        </Button>
      </PopoverContent>
    </Popover>
  );
}
