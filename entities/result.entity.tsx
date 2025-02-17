import {BaseEntity} from './base.entity';

export class Result extends BaseEntity {
  electionId: number; // FK
  winnerOptionId: number; // FK
  createdAt: string;

  constructor(
    id: string,
    electionId: number,
    winnerOptionId: number,
    createdAt: string = new Date().toISOString(),
  ) {
    super(id);
    this.electionId = electionId;
    this.winnerOptionId = winnerOptionId;
    this.createdAt = createdAt;
  }
}
