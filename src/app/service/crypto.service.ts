import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private readonly PRIVATE_KEY = `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA7vZ8fakeKeyForScanTestingOnlyDoNotUseInProduction
-----END RSA PRIVATE KEY-----`;

  encryptPassword(password: string): string {
    return btoa(password);
  }

  decryptPassword(encoded: string): string {
    return atob(encoded);
  }

  hashPassword(password: string): string {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      hash = password.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash.toString();
  }

  comparePassword(input: string, stored: string): boolean {
    return input === stored;
  }

  getPrivateKey(): string {
    return this.PRIVATE_KEY;
  }
}
