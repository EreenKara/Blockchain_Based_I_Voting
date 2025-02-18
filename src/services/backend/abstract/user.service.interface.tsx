import {User} from '@entities/user.entity';
import {GenericBackendService} from '../concrete/generic.backend.sevice';

export interface IUserService extends GenericBackendService<User> {
  getUsersByEmail(email: string): Promise<User[]>;
}
