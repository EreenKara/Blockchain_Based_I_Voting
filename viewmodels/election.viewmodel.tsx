import {Election} from '@entities/election.entity';

// dbo'larda buralara gelsin
export class ElectionViewModel {
  id: string;
  name: string;
  description: string;
  image: string;
  startDate: string;
  endDate: string;

  constructor(election: Election) {
    this.id = election.id;
    this.name = election.name;
    this.description = election.description;
    this.image = election.image;
    this.startDate = election.startDate;
    this.endDate = election.endDate;
  }
}
