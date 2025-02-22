/*
import {BaseEntity, BaseEntityOptions} from './base.entity';
import {Election} from './election.entity';
import {Choice} from './choice.entity';

export interface ElectionsChoicesOptions extends BaseEntityOptions {
  election?: Election | null;
  choice?: Choice | null;
}

export class ElectionsChoices extends BaseEntity {
  election: Election | null;
  choice: Choice | null;


  constructor(options: ElectionsChoicesOptions) {
    super({id: options.id});
    this.election = options.election
      ? Election.fromJSON(options.election)
      : null;
    this.choice = options.choice ? Choice.fromJSON(options.choice) : null;
  }
}
*/
