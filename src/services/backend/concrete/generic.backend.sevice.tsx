import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {API_URL} from '@env';
import {IGenericBackendService} from '../abstract/generic.backend.service.interface';
import LogService from '@services/log/log.service';

export abstract class GenericBackendService<T>
  implements IGenericBackendService<T>
{
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
        const currentToken = GenericBackendService.token;
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

  // Tüm kayıtları getir
  async getAll(): Promise<T[]> {
    const response: AxiosResponse<T[]> = await this.api.get(this.endpoint);
    return response.data;
  }

  // ID'ye göre tek bir kayıt getir
  async getById(id: number): Promise<T> {
    const response: AxiosResponse<T> = await this.api.get(
      `${this.endpoint}/${id}`,
    );
    return response.data;
  }

  // Yeni bir kayıt oluştur
  async create(data: Partial<T>): Promise<T> {
    const response: AxiosResponse<T> = await this.api.post(this.endpoint, data);
    return response.data;
  }

  // Bir kaydı güncelle
  async update(id: number, data: Partial<T>): Promise<T> {
    const response: AxiosResponse<T> = await this.api.put(
      `${this.endpoint}/${id}`,
      data,
    );
    return response.data;
  }

  // Bir kaydı sil
  async delete(id: number): Promise<void> {
    await this.api.delete(`${this.endpoint}/${id}`);
  }
}
