import {User} from '@entities/user.entity';
import {GenericBackendService} from '../concrete/generic.backend.sevice';

export interface IUserService extends GenericBackendService<User> {
  getUsersByEmail(email: string): Promise<User[]>;
  getCurrentUser(): Promise<User>;
  getUsersByEmail(email: string): Promise<User[]>;
  login(user: {email: string; password: string}): Promise<string>;
  register(user: User): Promise<string>;
  verifyEmail(emailOrIdentity: string, code: string): Promise<string>;
}
