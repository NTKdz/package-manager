import { Checkbox } from "@/components/ui/checkbox";
import { Package } from "@/interface/packageInterface";
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
    accessorKey: "user",
    header: "Người gửi",
  },
  { accessorKey: "requestedDate", header: "Ngày yêu cầu" },
  {
    accessorKey: "department",
    header: "Phòng ban",
  },
  {
    accessorKey: "company",
    header: "Mã công ty",
  },
  {
    accessorKey: "cpn",
    header: "Đơn vị CPN",
  },
  {
    accessorKey: "priority",
    header: "Độ khẩn",
  },
  {
    accessorKey: "confidentiality",
    header: "Độ mật",
  },
];
