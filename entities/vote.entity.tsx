export interface Vote {
  id: number;
  electionId: number; // FK
  optionId: number; // FK
  votedBy: number; // FK
  createdAt: string;
  updatedAt: string;
}
