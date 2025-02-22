import {BaseEntity, BaseEntityOptions} from './base.entity';
import {Election} from './election.entity';

export interface ChoiceOptions extends BaseEntityOptions {
  name: string;
  description: string;
  parent?: Choice | null;
  elections?: Election[] | null;
}

export class Choice extends BaseEntity {
  name: string;
  description: string;
  parent: Choice | null; // FK  - parentId
  elections?: Election[] | null;

  constructor(options: ChoiceOptions) {
    super({id: options.id});
    this.name = options.name;
    this.description = options.description;
    this.parent = options.parent ? Choice.fromJSON(options.parent) : null;
    this.elections =
      options.elections?.map(election => Election.fromJSON(election)) || null;
  }
}
