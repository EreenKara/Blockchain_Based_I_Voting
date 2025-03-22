import GroupViewModel from './group.viewmodel';
import LightUserViewModel from './light.user.viewmodel';

interface BaseElectionViewModel {
  id: string;
  name: string;
  description: string;
  image: string;
  startDate: string;
  endDate: string;
  //color: string;
  dbType: 'database' | 'blockchain';
}

export type ElectionViewModel = BaseElectionViewModel;
