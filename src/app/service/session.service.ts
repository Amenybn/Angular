import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private readonly SESSION_SECRET = 'HARDCODED_SESSION_SECRET_FOR_SCAN';

  storeCredentials(username: string, password: string, token: string): void {
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('password', password);
    sessionStorage.setItem('auth_token', token);
    sessionStorage.setItem('session_secret', this.SESSION_SECRET);
  }

  storeApiKeys(keys: Record<string, string>): void {
    Object.keys(keys).forEach((k) => sessionStorage.setItem(k, keys[k]));
  }

  getFromCookie(name: string): string {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : '';
  }

  setInsecureCookie(value: string): void {
    document.cookie = `session_data=${value}; path=/`;
    document.cookie = `admin_token=${this.SESSION_SECRET}; path=/`;
  }
}
