import {BaseElectionViewModel} from './base.election.viewmodel';
import GroupViewModel from './group.viewmodel';
import {ImageViewModel} from './image.viewmodel';
import LightUserViewModel from './light.user.viewmodel';

export interface ElectionCreationViewModel {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  image: ImageViewModel | null;
  electionType: 'database' | 'blockchain';
  step:
    | 'Info completed'
    | 'Access completed'
    | 'Candidate completed'
    | 'Choices completed'
    | 'Election completed';
}
