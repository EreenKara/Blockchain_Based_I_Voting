
import SQLite from 'react-native-sqlite-storage';
//kullanılmıyor
SQLite.DEBUG(true);
SQLite.enablePromise(true);

class DatabaseService {
  private static instance: DatabaseService;
  private database: SQLite.SQLiteDatabase | null = null;

  private constructor() {}

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  public async initDatabase(): Promise<void> {
    try {
      const db = await SQLite.openDatabase({
        name: 'voting.db',
        location: 'default'
      });
      
      this.database = db;
      
      await this.createTables();
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Database init error:', error);
      throw error;
    }
  }

  private async createTables(): Promise<void> {
    if (!this.database) {
      throw new Error('No database connection!');
    }

    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS Users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        identityNumber TEXT UNIQUE NOT NULL,
        phoneNumber TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL
      );
    `;

    try {
      await this.database.executeSql(createUsersTable);
      console.log('Users table created successfully');
    } catch (error) {
      console.error('Error creating tables:', error);
      throw error;
    }
  }

  public async registerUser(
    username: string,
    password: string,
    identityNumber: string,
    phoneNumber: string,
    email: string
  ): Promise<boolean> {
    if (!this.database) {
      throw new Error('No database connection!');
    }

    try {
      const insertQuery = `
        INSERT INTO Users (username, password, identityNumber, phoneNumber, email)
        VALUES (?, ?, ?, ?, ?);
      `;
      
      await this.database.executeSql(insertQuery, [
        username,
        password,
        identityNumber,
        phoneNumber,
        email
      ]);
      
      return true;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    }
  }

  public async loginUser(username: string, password: string): Promise<boolean> {
    if (!this.database) {
      throw new Error('No database connection!');
    }

    try {
      const query = 'SELECT * FROM Users WHERE username = ? AND password = ?;';
      const [resultSet] = await this.database.executeSql(query, [username, password]);
      
      return resultSet.rows.length > 0;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }
}

export const databaseService = DatabaseService.getInstance();