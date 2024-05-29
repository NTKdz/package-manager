export interface PackageInterface {
  waybill: number;
  user: string;
  department: string;
  company: string;
  cpn: string;
  priority: string;
  Confidentiality: string;
}

function generatePackage() {
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
    waybill: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000, // Random waybill between 100000 and 999999
    user: `User ${Math.floor(Math.random() * 100) + 1}`, // User + random number between 1 and 100
    department: departments[Math.floor(Math.random() * departments.length)], // Random department
    company: companies[Math.floor(Math.random() * companies.length)], // Random company
    cpn: `CPN-${Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000}`, // Random CPN between CPN-1000 and CPN-9999
    priority: priorities[Math.floor(Math.random() * priorities.length)], // Random priority
    Confidentiality:
      confidentialityOptions[
        Math.floor(Math.random() * confidentialityOptions.length)
      ], // Random confidentiality
  };
}

export const mockPackages = Array(10).fill(null).map(generatePackage);

console.log(mockPackages);
