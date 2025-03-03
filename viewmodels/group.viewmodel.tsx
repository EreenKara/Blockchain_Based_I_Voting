import LightUserViewModel from './light.user.viewmodel';

export interface GroupViewModel {
  id: string;
  name: string;
  users: LightUserViewModel[];
}

export default GroupViewModel;
