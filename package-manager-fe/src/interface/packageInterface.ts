export interface PackageInterface {
  waybill: number;
  user: string;
  requestedDate: string;
  department: string;
  company: string;
  cpn: string;
  priority: string;
  Confidentiality: string;
}

function generatePackage(): PackageInterface {
  const companies = [
    "Acme Corp",
    "Big Box Inc",
    "Tech Solutions",
    "Green Energy",
  ];
  const departments = ["Marketing", "Sales", "Engineering", "Human Resources"];
  const priorities = ["Standard", "Priority", "Rush"];
  const confidentialityOptions = ["Standard", "Confidential"];

  return {
    waybill: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    user: `User ${Math.floor(Math.random() * 100) + 1}`,
    requestedDate: new Date().toISOString(),
    department: departments[Math.floor(Math.random() * departments.length)],
    company: companies[Math.floor(Math.random() * companies.length)],
    cpn: `CPN-${Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000}`,
    priority: priorities[Math.floor(Math.random() * priorities.length)],
    Confidentiality: confidentialityOptions[Math.floor(Math.random() * confidentialityOptions.length)],
  };
}

export const mockPackages: PackageInterface[] = Array(10).fill(null).map(generatePackage);

console.log(mockPackages);
