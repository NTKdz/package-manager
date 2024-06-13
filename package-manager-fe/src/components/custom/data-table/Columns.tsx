import { Checkbox } from "@/components/ui/checkbox";
import { PackageInterface } from "@/interface/packageInterface";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<PackageInterface>[] = [
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
    header: "Tên đăng nhập",
  },
  {
    accessorKey: "userFullName",
    header: "Người gửi",
  },
  {
    accessorKey: "requestedDate",
    header: "Ngày yêu cầu",
    cell: ({ row }) => {
      try {
        const formattedDate = new Date(row.original.requestedDate)
          .toISOString()
          .split("T")[0];
        return <div>{formattedDate}</div>;
      } catch (error) {
        return <div>Invalid Date</div>;
      }
    },
  },
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
