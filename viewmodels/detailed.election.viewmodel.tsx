export interface DetailedElectionViewModel {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  image: string;
  electionType: 'database' | 'blockchain';
  step:
    | 'Info completed'
    | 'Access completed'
    | 'Candidate completed'
    | 'Choices completed'
    | 'Election completed';
  status: 'past' | 'current' | 'upcoming';
  accessType: 'public' | 'private';
  //cityId: string;
  //districtId: string;
  //groups: [];
  //users: [];
  //candidates: [];
}

export default DetailedElectionViewModel;
