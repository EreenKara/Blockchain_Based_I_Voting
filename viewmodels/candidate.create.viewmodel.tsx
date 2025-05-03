import {ImageViewModel} from './image.viewmodel';

export interface CandidateCreateViewModel {
  id: string;
  name: string;
  color: string;
  votes: number;
  image?: ImageViewModel | null;
  userId: string | null;
}

export default CandidateCreateViewModel;
