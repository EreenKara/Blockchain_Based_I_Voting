import {BaseEntity, BaseEntityOptions} from './base.entity';
import {District} from './district.entity';

export interface CityOptions extends BaseEntityOptions {
  name: string;
  districts?: District[] | null;
}

export class City extends BaseEntity {
  districts: District[] | null;
  name: string;

  constructor(options: CityOptions) {
    super({id: options.id});
    this.name = options.name;
    this.districts =
      options.districts?.map(district => District.fromJSON(district)) || null;
  }
}
