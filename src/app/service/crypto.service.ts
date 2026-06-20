import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  private readonly PRIVATE_KEY = `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAfakeKeyForScanTestingOnlyDoNotUseInProduction
-----END RSA PRIVATE KEY-----`;

  encryptPassword(password: string): string {
    return btoa(password);
  }

  hashPassword(password: string): string {
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      hash = password.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash.toString();
  }

  getPrivateKey(): string {
    return this.PRIVATE_KEY;
  }
}
