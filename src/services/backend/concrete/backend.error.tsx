import axios, {AxiosError} from 'axios';

interface API_Error extends Error {
  status: number;
  message: string;
  data?: any;
}

class BackendError extends Error implements API_Error {
  status: number;
  data?: any;

  constructor(error: AxiosError | Error) {
    if (axios.isAxiosError(error)) {
      super(error.response?.data?.message || error.message);
      this.status = error.response?.status || 500;
      this.data = error.response?.data;
    } else {
      super(error.message);
      this.status = 500;
    }
    this.name = 'BackendError';
  }
}

export type {API_Error};
export {BackendError};
