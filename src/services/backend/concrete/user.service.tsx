import {User} from '@entities/user.entity';
import {IUserService} from '@services/backend/abstract/user.service.interface';
import {GenericBackendService} from './generic.backend.sevice';
import axios, {AxiosError} from 'axios';
export class UserService
  extends GenericBackendService<User>
  implements IUserService
{
  constructor() {
    super('/user/api/users');
  }
  async getCurrentUser(): Promise<User> {
    const response = await this.api.get<User>(`${this.endpoint}/current`);
    return response.data;
  }
  async getUsersByEmail(email: string): Promise<User[]> {
    const response = await this.api.get<User[]>(
      `${this.endpoint}?email=${email}`,
    );
    return response.data;
  }
  async register(user: User): Promise<string> {
    console.log(user);
    console.log('baseURL: ', this.api.defaults.baseURL);
    try {
      const response = await this.api.post(`${this.endpoint}/register`, user);
      return response.data.message;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        let message =
          error.response?.data.message ??
          'Registration failed by some reasons.';
        error.response?.data.errors?.map((error: any) => {
          message += `\n ${error}`;
        });
        throw new Error(message);
      } else {
        throw new Error('Registration failed by some reasons.');
      }
    }
  }
  async login(user: {email: string; password: string}): Promise<string> {
    const loginUser = {
      emailOrIdentity: user.email,
      password: user.password,
    };
    try {
      const response = await this.api.post(`${this.endpoint}/login`, loginUser);
      return response.data.token;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        let message = error.response?.data.message;
        error.response?.data.errors?.map((error: any) => {
          message += `\n ${error}`;
        });
        throw new Error(message);
      } else {
        console.error(error);
        throw new Error('Login failed by some reasons.');
      }
    }
  }
  async verifyEmail(emailOrIdentity: string, code: string): Promise<string> {
    const response = await this.api.post(`${this.endpoint}/verify-email`, {
      emailOrIdentity,
      code,
    });
    return response.data.message;
  }
}
