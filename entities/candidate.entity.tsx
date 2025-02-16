export interface Candidate {
  id: number;
  electionId: number; // FK
  userId: number; // FK
  name: string;
  description: string;
  image: string;
  color: string;
  voteCount: number;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
}
