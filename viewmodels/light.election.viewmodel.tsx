import {BaseElectionViewModel} from './base.election.viewmodel';

export interface LightElectionViewModel
  extends Omit<BaseElectionViewModel, 'image'> {
  //id: string;
  //name: string;
  //description: string;
  //startDate: string;
  //endDate: string;
  image: string | null;
}

export default LightElectionViewModel;
