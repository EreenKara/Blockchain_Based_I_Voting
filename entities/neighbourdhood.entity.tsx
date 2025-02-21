import {BaseEntity} from './base.entity';
import {District} from './district.entity';

export interface NeighborhoodOptions {
  id: string;
  name: string;
  district?: District | null;
}

export class Neighborhood extends BaseEntity {
  district: District | null;
  name: string;

  constructor(options: NeighborhoodOptions) {
    super(options.id);
    this.name = options.name;
    this.district = options.district
      ? District.fromJSON(options.district)
      : null;
  }
}
