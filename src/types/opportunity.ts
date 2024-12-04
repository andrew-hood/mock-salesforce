export interface Opportunity {
  id: string;
  name: string;
  amount: number;
  stage: 'Prospecting' | 'Qualification' | 'Proposal' | 'Negotiation' | 'Closed Won' | 'Closed Lost';
  closeDate: string;
  probability: number;
  account: string;
  owner: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}