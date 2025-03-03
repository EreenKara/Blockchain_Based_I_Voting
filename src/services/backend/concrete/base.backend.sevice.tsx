import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {API_URL} from '@env';
import {IBaseBackendService} from '../abstract/base.backend.service.interface';
import LogService from '@services/log/log.service';

export abstract class BaseBackendService implements IBaseBackendService {
  protected static readonly LogService: LogService;
  protected readonly api: AxiosInstance;
  protected readonly endpoint: string;
  private static token: string | null = null;

  constructor(endpoint: string) {
    this.api = axios.create({
      baseURL: 'http://10.0.2.2:3000', // API'nin base URL'i
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.endpoint = endpoint;

    // Token interceptor'ı
    this.api.interceptors.request.use(
      async (config: any) => {
        const currentToken = BaseBackendService.token;
        if (currentToken && currentToken !== '') {
          config.headers.Authorization = `Bearer ${currentToken}`;
        }
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      },
    );
  }

  // Token'ı güncellemek için statik method
  public static setToken(token: string | null) {
    this.token = token;
  }
}

export default BaseBackendService;
