import {ExtendedAsset} from '@hooks/useCamera';
import {ImageViewModel} from './image.viewmodel';

export interface CandidateCreateViewModel {
  id: string;
  name: string;
  color: string;
  image: ExtendedAsset | null;
  userId: string | null;
}

export default CandidateCreateViewModel;
