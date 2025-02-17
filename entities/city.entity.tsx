import {BaseEntity} from './base.entity';
import {District} from './district.entity';
export class City extends BaseEntity {
  districts?: District[];
  name: string;

  constructor(id: string, name: string, districts?: District[]) {
    super(id);
    this.name = name;
    this.districts = districts?.map(district => District.fromJSON(district));
  }
}
