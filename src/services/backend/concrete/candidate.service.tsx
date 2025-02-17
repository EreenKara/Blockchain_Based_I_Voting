import {Candidate} from '@entities/candidate.entity';
import {ICandidateService} from '../abstract/candidate.service.interface';
import {GenericBackendService} from './generic.backend.sevice';

export class CandidateService
  extends GenericBackendService<Candidate>
  implements ICandidateService
{
  constructor() {
    super('candidates');
  }
}
