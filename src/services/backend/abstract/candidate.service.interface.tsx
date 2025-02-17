import {Candidate} from '@entities/candidate.entity';
import {IGenericBackendService} from './generic.backend.service.interface';

export interface ICandidateService extends IGenericBackendService<Candidate> {}
