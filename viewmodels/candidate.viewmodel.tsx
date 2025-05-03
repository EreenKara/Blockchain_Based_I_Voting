export interface CandidateViewModel {
  id: string;
  name: string;
  color: string;
  votes: number;
  image?: string;
  userId: string | null;
}

export default CandidateViewModel;
