import {BaseEntity} from './base.entity';
import {District} from './district.entity';

export class Neighborhood extends BaseEntity {
  district?: District;
  name: string;

  constructor(id: string, name: string, district?: District) {
    super(id);
    this.name = name;
    this.district = district ? District.fromJSON(district) : undefined;
  }
}
