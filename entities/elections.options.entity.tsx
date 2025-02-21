import {BaseEntity} from './base.entity';
import {Election} from './election.entity';
import {Option} from './option.entity';

export interface ElectionsOptionsOptions {
  id: string;
  election?: Election | null;
  option?: Option | null;
}

export class ElectionsOptions extends BaseEntity {
  election: Election | null;
  option: Option | null;

  constructor(options: ElectionsOptionsOptions) {
    super(options.id);
    this.election = options.election
      ? Election.fromJSON(options.election)
      : null;
    this.option = options.option ? Option.fromJSON(options.option) : null;
  }
}
