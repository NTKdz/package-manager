export interface PackageInterface {
  waybill: number;
  user: string;
  userFullName: string;
  requestedDate: string;
  department: string;
  company: string;
  priority: string;
  confidentiality: string;
}

export interface RequestWaybillInterface {
  waybill?: number | null;
  user: string | null;
  userFullName: string | null;
  requestedDate: Date | null;
  department?: string | null;
  priority: string | null;
  confidentiality: string | null;
}

// function generatePackage(): PackageInterface {
//   const companies = [
//     "Acme Corp",
//     "Big Box Inc",
//     "Tech Solutions",
//     "Green Energy",
//   ];
//   const departments = ["Marketing", "Sales", "Engineering", "Human Resources"];
//   const priorities = ["Standard", "Priority", "Rush"];
//   const confidentialityOptions = ["Standard", "Confidential"];

//   return {
//     waybill: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
//     user: `User ${Math.floor(Math.random() * 100) + 1}`,
//     requestedDate: new Date().toISOString(),
//     department: departments[Math.floor(Math.random() * departments.length)],
//     company: companies[Math.floor(Math.random() * companies.length)],
//     cpn: `CPN-${Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000}`,
//     priority: priorities[Math.floor(Math.random() * priorities.length)],
//     confidentiality:
//       confidentialityOptions[
//         Math.floor(Math.random() * confidentialityOptions.length)
//       ],
//   };
// }

// export const mockPackages: PackageInterface[] = Array(10)
//   .fill(null)
//   .map(generatePackage);
