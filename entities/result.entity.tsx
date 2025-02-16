export interface Result {
  id: number;
  electionId: number; // FK
  winnerOptionId: number; // FK
  createdAt: string;
}
