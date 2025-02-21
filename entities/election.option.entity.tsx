import {BaseEntity} from './base.entity';
import {Election} from './election.entity';
import {Option} from './option.entity';

export interface ElectionOptionOptions {
  id: string;
  election: Election;
  option: Option;
}

export class ElectionOption extends BaseEntity {
  election: Election;
  option: Option;

  constructor(options: ElectionOptionOptions) {
    super(options.id);
    this.election = Election.fromJSON(options.election);
    this.option = Option.fromJSON(options.option);
  }
}
