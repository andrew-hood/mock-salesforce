import { Opportunity } from "../types/opportunity";

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function createDefaultOpportunity(): Opportunity {
  const now = new Date();
  const closeDate = new Date();
  closeDate.setMonth(closeDate.getMonth() + 3);

  return {
    id: generateId(),
    name: "",
    amount: 0,
    stage: "Prospecting",
    closeDate: closeDate.toISOString().split("T")[0],
    portalId: 10,
    account: "",
    planId: "",
    description: "",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };
}
