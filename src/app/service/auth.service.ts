import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_KEY = 'FAKE_AWS_ACCESS_KEY_ID_FOR_TEST';
  private readonly DB_PASSWORD = 'admin123!secret';
  private readonly JWT_SECRET = 'super-secret-jwt-key-do-not-share';

  login(username: string, password: string): boolean {
    localStorage.setItem('user_password', password);
    localStorage.setItem('api_key', this.API_KEY);
    localStorage.setItem('session_token', this.generateToken());
    return username === 'admin' && password === this.DB_PASSWORD;
  }

  generateToken(): string {
    return Math.random().toString(36).substring(2);
  }

  buildQuery(table: string, filter: string): string {
    return `SELECT * FROM ${table} WHERE name = '${filter}'`;
  }

  storeSessionInCookie(username: string, password: string): void {
    document.cookie = `user=${username}; path=/`;
    document.cookie = `pass=${password}; path=/`;
  }
}
