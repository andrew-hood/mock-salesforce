import { Opportunity } from "../types/opportunity";

export const mockOpportunities: Opportunity[] = [
  {
    id: "1",
    name: "Enterprise Software Deal",
    amount: 150000,
    stage: "Proposal",
    closeDate: "2024-06-30",
    portalId: 70,
    account: "Acme Corp",
    planId: "",
    description: "Enterprise-wide software implementation",
    createdAt: "2024-03-15",
    updatedAt: "2024-03-15",
  },
  {
    id: "2",
    name: "Cloud Migration Project",
    amount: 250000,
    stage: "Qualification",
    closeDate: "2024-07-15",
    portalId: 45,
    account: "TechStart Inc",
    planId: "",
    description: "Cloud infrastructure migration",
    createdAt: "2024-03-14",
    updatedAt: "2024-03-15",
  },
];
