import GroupViewModel from './group.viewmodel';
import LightUserViewModel from './light.user.viewmodel';

export interface PublicElectionAccessViewModel {
  accessType?: 'public';
  cityId?: string;
  districtId?: string;
}

export interface PrivateElectionAccessViewModel {
  accessType?: 'private';
  groups?: GroupViewModel[];
  users?: LightUserViewModel[];
}

export type ElectionAccessViewModel =
  | PublicElectionAccessViewModel
  | PrivateElectionAccessViewModel;
