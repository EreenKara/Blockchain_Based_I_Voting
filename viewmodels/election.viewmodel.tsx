import {BaseElectionViewModel} from './base.election.viewmodel';
import GroupViewModel from './group.viewmodel';
import {ImageViewModel} from './image.viewmodel';
import LightUserViewModel from './light.user.viewmodel';

export interface ElectionViewModel
  extends Omit<BaseElectionViewModel, 'image'> {
  //id: string;
  //name: string;
  //description: string;
  //image: string;
  //startDate: string;
  //endDate: string;
  image: ImageViewModel | null;
  dbType: 'database' | 'blockchain';
  step: 'step 1' | 'step 2' | 'step 3' | 'step 4';
}
