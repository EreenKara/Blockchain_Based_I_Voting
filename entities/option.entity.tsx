import {BaseEntity} from './base.entity';
import {ElectionsOptions} from './elections.options.entity';
export class Option extends BaseEntity {
  name: string;
  description: string;
  parent?: Option; // FK  - parentId
  electionsOptions?: ElectionsOptions[];

  constructor(
    id: string,
    name: string,
    description: string,
    parent?: Option,
    electionsOptions?: ElectionsOptions[],
  ) {
    super(id);
    this.name = name;
    this.description = description;
    this.parent = parent ? Option.fromJSON(parent) : undefined;
    this.electionsOptions = electionsOptions?.map(option =>
      ElectionsOptions.fromJSON(option),
    );
  }
}
