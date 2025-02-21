import {BaseEntity, BaseEntityOptions} from './base.entity';
import {ElectionsChoices} from './elections.choices.entity';

export interface ChoiceOptions extends BaseEntityOptions {
  name: string;
  description: string;
  parent?: Choice | null;
  electionsChoicesOptions?: ElectionsChoices[] | null;
}

export class Choice extends BaseEntity {
  name: string;
  description: string;
  parent: Choice | null; // FK  - parentId
  electionsChoices?: ElectionsChoices[] | null;

  constructor(options: ChoiceOptions) {
    super({id: options.id});
    this.name = options.name;
    this.description = options.description;
    this.parent = options.parent ? Choice.fromJSON(options.parent) : null;
    this.electionsChoices =
      options.electionsChoicesOptions?.map(choice =>
        ElectionsChoices.fromJSON(choice),
      ) || null;
  }
}
