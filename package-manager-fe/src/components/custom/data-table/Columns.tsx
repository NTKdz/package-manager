import { Checkbox } from "@/components/ui/checkbox";
import { Package } from "@/redux/interface/packageInterface";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Package>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: boolean) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "waybill",
    header: "Mã vận đơn",
  },
  {
    accessorKey: "company",
    header: "Mã công ty",
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
  },
  {
    accessorKey: "cpn",
    header: "Đơn vị CPN",
  },
  {
    accessorKey: "department",
    header: "Phòng ban",
  },
];
