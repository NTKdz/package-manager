import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { RootState } from "@/redux/store";
import TableService from "@/services/TableService";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function LoginSetup({
  clear,
  onChange,
  setClear,
}: {
  clear?: boolean;
  onChange: (value: string) => void;
  setClear: (value: boolean) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(
    localStorage.getItem("department") || "Chọn phòng ban để thay đổi thông tin"
  );
  const { departments } = useSelector((state: RootState) => state.departments);
  const { getDepartmentList } = TableService();

  useEffect(() => {
    getDepartmentList();
  }, []);

  useEffect(() => {
    if (clear) {
      setValue(localStorage.getItem("department") || "");
    }
  }, [clear]);

  useEffect(() => {
    !clear && onChange(value);
  }, [value]);

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <div>
          <div className="text-lg font-bold">Phòng ban</div>
          <div className="text-sm text-gray-500 mb-1">
            Chọn phòng ban để thay đổi thông tin
          </div>
        </div>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between overflow-hidden"
          >
            {value
              ? departments.find(
                  (framework) => framework.departmentName === value
                )?.departmentName
              : "Chọn phòng ban..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search framework..." className="h-9" />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {departments.map((department) => (
                  <CommandItem
                    key={department.departmentCd}
                    value={department.departmentName}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                      setClear(false);
                    }}
                  >
                    {department.departmentName}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === department.departmentName
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
