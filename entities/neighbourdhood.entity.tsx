import {BaseEntity, BaseEntityOptions} from './base.entity';
import {District} from './district.entity';

export interface NeighborhoodOptions extends BaseEntityOptions {
  name: string;
  district?: District | null;
}

export class Neighborhood extends BaseEntity {
  district: District | null;
  name: string;

  constructor(options: NeighborhoodOptions) {
    super({id: options.id});
    this.name = options.name;
    this.district = options.district
      ? District.fromJSON(options.district)
      : null;
  }
}
