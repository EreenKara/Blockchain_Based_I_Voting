import {IUserService} from '@services/backend/abstract/user.service.interface';
import BaseBackendService from './base.backend.sevice';
import axios, {AxiosError} from 'axios';
import RegisterViewModel from '@viewmodels/register.viewmodel';
import LoginViewModel from '@viewmodels/login.viewmodel';
import UserViewModel from '@viewmodels/user.viewmodel';
import {AddressViewModel} from '@viewmodels/address.viewmodel';
import GroupViewModel from '@viewmodels/group.viewmodel';
export class UserService extends BaseBackendService implements IUserService {
  constructor() {
    super('/user/api/users');
  }
  async getCurrentUser(): Promise<UserViewModel> {
    const response = await this.api.get<UserViewModel>(
      `${this.endpoint}/current`,
    );
    return response.data;
  }
  async register(user: RegisterViewModel): Promise<string> {
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
  async login(user: LoginViewModel): Promise<string> {
    try {
      const response = await this.api.post(`${this.endpoint}/login`, user);
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
    const response = await this.api.post(`${this.endpoint}/verifyCode`, {
      emailOrIdentity,
      code,
    });
    return response.data.message;
  }
  async getAddressesById(userId: string): Promise<AddressViewModel[]> {
    const response = await this.api.get<AddressViewModel[]>(
      `${this.endpoint}/user/${userId}/addresses`,
    );
    return response.data;
  }
  public async getGroupsByUserId(userId: string): Promise<GroupViewModel[]> {
    const response = await this.api.get<GroupViewModel[]>(
      `${this.endpoint}/user/${userId}/groups`,
    );
    return response.data;
  }
  public async getGroupById(groupId: string): Promise<GroupViewModel> {
    const response = await this.api.get<GroupViewModel>(
      `${this.endpoint}/group/${groupId}`,
    );
    return response.data;
  }
  public async getAddressById(addressId: string): Promise<AddressViewModel> {
    const response = await this.api.get<AddressViewModel>(
      `${this.endpoint}/address/${addressId}`,
    );
    return response.data;
  }
}

export default UserService;
