export type Package = {
    waybill: number;
    company: string;
    status: "pending" | "processing" | "success" | "failed";
    cpn: string;
    department: string;
  };