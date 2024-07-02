import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

export function CustomDropdownMenu({
  value,
  title,
  menuItem,
  onItemSelected,
}: {
  title: string;
  value: string;
  menuItem: { title: string; value: string }[];
  onItemSelected: (value: string) => void;
}) {
  const [currentValue, setCurrentValue] = React.useState(value);

  React.useEffect(() => {
    if (!value) setCurrentValue("");
  }, [value]);
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Input id="name" value={currentValue} className="col-span-3" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="sm:w-[100px] md:w-[300px] max-h-[700px] overflow-scroll">
        <DropdownMenuLabel>{title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={currentValue}
          onValueChange={(e) => {
            setCurrentValue(
              menuItem.find((item) => item.value === e)?.title || ""
            );
            onItemSelected(e);
          }}
        >
          {menuItem.map((item) => (
            <DropdownMenuRadioItem key={item.title} value={item.value}>
              {item.title}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
