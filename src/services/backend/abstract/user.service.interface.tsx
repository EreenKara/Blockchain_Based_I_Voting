import {User} from '@entities/user.entity';
import {IGenericBackendService} from './generic.backend.service.interface';

export interface IUserService extends IGenericBackendService<User> {
  getUsersByEmail(email: string): Promise<User[]>;
}
