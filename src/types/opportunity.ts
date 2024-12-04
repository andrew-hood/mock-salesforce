export interface Opportunity {
  id: string;
  name: string;
  amount: number;
  stage:
    | "Prospecting"
    | "Qualification"
    | "Proposal"
    | "Negotiation"
    | "Closed Won"
    | "Closed Lost";
  closeDate: string;
  portalId: number;
  account: string;
  planId: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}
