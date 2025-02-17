import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserLog, LoginLog, Election} from './types';

export default class LogService {
  private static readonly file: string = 'log.txt';

  private readonly USERS_KEY = '@users';
  private readonly LOGIN_LOGS_KEY = '@login_logs';
  private readonly ELECTIONS_KEY = '@elections';
  constructor() {}

  static info(message: string, ...params: any[]): void {
    const logMessage = `[INFO] ${message}`;
    console.info(logMessage, ...params);
  }

  static warn(message: string, ...params: any[]): void {
    const logMessage = `[WARN] ${message}`;
    console.warn(logMessage, ...params);
  }

  static error(message: string, ...params: any[]): void {
    const logMessage = `[ERROR] ${message}`;
    console.error(logMessage, ...params);
  }

  private async getUsers(): Promise<UserLog[]> {
    const users = await AsyncStorage.getItem(this.USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  private async getLoginLogs(): Promise<LoginLog[]> {
    const logs = await AsyncStorage.getItem(this.LOGIN_LOGS_KEY);
    return logs ? JSON.parse(logs) : [];
  }

  private async getElections(): Promise<Election[]> {
    const elections = await AsyncStorage.getItem(this.ELECTIONS_KEY);
    return elections ? JSON.parse(elections) : [];
  }
}
