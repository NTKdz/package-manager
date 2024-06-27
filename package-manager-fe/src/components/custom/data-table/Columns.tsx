import { PackageInterface } from "@/interface/packageInterface";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<PackageInterface>[] = [
  {
    accessorKey: "waybill",
    header: "Mã vận đơn",
    maxSize: 10,
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
    accessorKey: "priority",
    header: "Độ khẩn",
    minSize: 1000,
  },
  {
    accessorKey: "confidentiality",
    header: "Độ mật",
    minSize: 1000,
  },
];
