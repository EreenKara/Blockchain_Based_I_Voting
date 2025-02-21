import {BaseEntity} from './base.entity';
import {ElectionsOptions} from './elections.options.entity';

export interface OptionOptions {
  id: string;
  name: string;
  description: string;
  parent?: Option | null;
  electionsOptions?: ElectionsOptions[] | null;
}

export class Option extends BaseEntity {
  name: string;
  description: string;
  parent: Option | null; // FK  - parentId
  electionsOptions?: ElectionsOptions[] | null;

  constructor(options: OptionOptions) {
    super(options.id);
    this.name = options.name;
    this.description = options.description;
    this.parent = options.parent ? Option.fromJSON(options.parent) : null;
    this.electionsOptions =
      options.electionsOptions?.map(option =>
        ElectionsOptions.fromJSON(option),
      ) || null;
  }
}
