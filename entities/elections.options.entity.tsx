import {BaseEntity} from './base.entity';
import {Election} from './election.entity';
import {Option} from './option.entity';
export class ElectionsOptions extends BaseEntity {
  election?: Election; // FK
  option?: Option; // FK

  constructor(id: string, election?: Election, option?: Option) {
    super(id);
    this.election = election ? Election.fromJSON(election) : undefined;
    this.option = option ? Option.fromJSON(option) : undefined;
  }
}
