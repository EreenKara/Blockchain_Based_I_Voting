import {BaseElectionViewModel} from './base.election.viewmodel';
import GroupViewModel from './group.viewmodel';
import LightUserViewModel from './light.user.viewmodel';

export interface ElectionViewModel extends BaseElectionViewModel {
  //id: string;
  //name: string;
  //description: string;
  //image: string;
  //startDate: string;
  //endDate: string;
  dbType: 'database' | 'blockchain';
  step: 'step 1' | 'step 2' | 'step 3' | 'step 4';
}
