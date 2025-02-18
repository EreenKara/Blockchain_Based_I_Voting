import {User} from '@entities/user.entity';
import {IUserService} from '@services/backend/abstract/user.service.interface';
import {GenericBackendService} from './generic.backend.sevice';

export class UserService
  extends GenericBackendService<User>
  implements IUserService
{
  constructor() {
    super('users');
  }
  async getUsersByEmail(email: string): Promise<User[]> {
    const response = await this.api.get<User[]>(
      `${this.endpoint}?email=${email}`,
    );
    return response.data;
  }
}
