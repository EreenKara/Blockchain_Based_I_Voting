import BaseBackendService from '../concrete/base.backend.sevice';
import {RegisterViewModel} from '@viewmodels/register.viewmodel';
import {LoginViewModel} from '@viewmodels/login.viewmodel';
import UserViewModel from '@viewmodels/user.viewmodel';
export interface IUserService extends BaseBackendService {
  getCurrentUser(): Promise<UserViewModel>;
  login(user: LoginViewModel): Promise<string>;
  register(user: RegisterViewModel): Promise<string>;
  verifyEmail(emailOrIdentity: string, code: string): Promise<string>;
}
