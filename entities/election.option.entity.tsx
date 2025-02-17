import {BaseEntity} from './base.entity';

export class ElectionOption extends BaseEntity {
  electionId: number; // FK
  optionId: number; // FK

  constructor(id: string, electionId: number, optionId: number) {
    super(id);
    this.electionId = electionId;
    this.optionId = optionId;
  }
}
