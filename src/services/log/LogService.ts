
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserLog, LoginLog, Election } from './types';

class LogService {
  private static instance: LogService;
  private readonly USERS_KEY = '@users';
  private readonly LOGIN_LOGS_KEY = '@login_logs';
  private readonly ELECTIONS_KEY = '@elections';

  private constructor() {}

  public static getInstance(): LogService {
    if (!LogService.instance) {
      LogService.instance = new LogService();
    }
    return LogService.instance;
  }

  public async initService(): Promise<void> {
    try {
      const keys = [this.USERS_KEY, this.LOGIN_LOGS_KEY, this.ELECTIONS_KEY];
      for (const key of keys) {
        const value = await AsyncStorage.getItem(key);
        if (!value) {
          await AsyncStorage.setItem(key, JSON.stringify([]));
        }
      }
      console.log('Log service initialized successfully');
    } catch (error) {
      console.error('Log service initialization error:', error);
      throw error;
    }
  }

  // User Management
  public async registerUser(
    username: string,
    password: string,
    identityNumber: string,
    phoneNumber: string,
    email: string
  ): Promise<boolean> {
    try {
      const users = await this.getUsers();
      const userExists = users.some(
        user => user.username === username || 
                user.email === email || 
                user.identityNumber === identityNumber
      );

      if (userExists) {
        return false;
      }

      const newUser: UserLog = {
        id: Date.now().toString(),
        username,
        password,
        identityNumber,
        phoneNumber,
        email,
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      await AsyncStorage.setItem(this.USERS_KEY, JSON.stringify(users));
      return true;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    }
  }

  public async loginUser(username: string, password: string): Promise<boolean> {
    try {
      const users = await this.getUsers();
      const user = users.find(u => u.username === username && u.password === password);
      
      const loginLog: LoginLog = {
        username,
        timestamp: new Date().toISOString(),
        success: !!user
      };

      const loginLogs = await this.getLoginLogs();
      loginLogs.push(loginLog);
      await AsyncStorage.setItem(this.LOGIN_LOGS_KEY, JSON.stringify(loginLogs));

      return !!user;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }

  // Election Management - Basic Version
  public async createElection(
    title: string,
    description: string,
    startDate: string,
    endDate: string,
    createdBy: string
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const now = new Date();
      const start = new Date(startDate);
      const end = new Date(endDate);
  
      // Geçmiş tarihe seçim eklemeyi engelle
      if (start < now) {
        return { 
          success: false, 
          message: 'Başlangıç tarihi geçmiş bir tarih olamaz' 
        };
      }
  
      // Bitiş tarihi başlangıç tarihinden önce olamaz
      if (end <= start) {
        return { 
          success: false, 
          message: 'Bitiş tarihi başlangıç tarihinden sonra olmalıdır' 
        };
      }
  
      const elections = await this.getElections();
  
      // Seçim durumunu belirle
      let status: 'upcoming' | 'active' | 'completed';
      if (now >= start && now <= end) {
        status = 'active';
      } else if (now > end) {
        status = 'completed';
      } else {
        status = 'upcoming';
      }
  
      const newElection: Election = {
        id: Date.now().toString(),
        title,
        description,
        startDate,
        endDate,
        createdBy,
        status
      };
  
      elections.push(newElection);
      await AsyncStorage.setItem(this.ELECTIONS_KEY, JSON.stringify(elections));
      return { success: true };
    } catch (error) {
      console.error('Create election error:', error);
      return { success: false, message: 'Bir hata oluştu' };
    }
  }
  public async getCurrentElections(): Promise<Election[]> {
    try {
      const elections = await this.getElections();
      const now = new Date();
      
      // Durumları güncelle ve güncel seçimleri filtrele
      return elections.filter(election => {
        const start = new Date(election.startDate);
        const end = new Date(election.endDate);
        
        // Şu anki seçimler: Başlangıç tarihi gelmiş ve bitiş tarihi gelmemiş olanlar
        return start <= now && end >= now;
      });
    } catch (error) {
      console.error('Get current elections error:', error);
      return [];
    }
  }
  public async getPastElections(): Promise<Election[]> {
    try {
      const elections = await this.getElections();
      const now = new Date();
      
      return elections.filter(election => {
        const end = new Date(election.endDate);
        return end < now;
      });
    } catch (error) {
      console.error('Get past elections error:', error);
      return [];
    }
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

  // Simplified Candidate Management
  public async becomeCandidate(userId: string, biography: string): Promise<boolean> {
    try {
      const users = await this.getUsers();
      const userIndex = users.findIndex(user => user.id === userId);
      
      if (userIndex === -1) return false;
  
      // Kullanıcıyı güncelle
      users[userIndex] = {
        ...users[userIndex],
        biography,
        isCandidate: true  // Aday durumunu güncelle
      };
  
      await AsyncStorage.setItem(this.USERS_KEY, JSON.stringify(users));
      return true;
    } catch (error) {
      console.error('Become candidate error:', error);
      return false;
    }
  }
  private async updateElectionStatuses(): Promise<void> {
    try {
      const elections = await this.getElections();
      const now = new Date();
      
      const updatedElections = elections.map(election => {
        const start = new Date(election.startDate);
        const end = new Date(election.endDate);
        
        let status: 'upcoming' | 'active' | 'completed';
        if (now >= start && now <= end) {
          status = 'active';
        } else if (now > end) {
          status = 'completed';
        } else {
          status = 'upcoming';
        }
        
        return { ...election, status };
      });
      
      await AsyncStorage.setItem(this.ELECTIONS_KEY, JSON.stringify(updatedElections));
    } catch (error) {
      console.error('Update election statuses error:', error);
    }
  }
  public async getUpcomingElections(): Promise<Election[]> {
    try {
      const elections = await this.getElections();
      const now = new Date();
      
      return elections.filter(election => {
        const start = new Date(election.startDate);
        return start > now;
      }).sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    } catch (error) {
      console.error('Get upcoming elections error:', error);
      return [];
    }
  }
}

export const logService = LogService.getInstance();