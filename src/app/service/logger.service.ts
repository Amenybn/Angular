import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  logUserCredentials(username: string, password: string): void {
    console.log(`Login attempt: username=${username}, password=${password}`);
  }

  logCreditCard(cardNumber: string, cvv: string): void {
    console.debug('Payment:', { cardNumber, cvv, expiry: '12/28' });
  }

  logToken(token: string): void {
    console.info('JWT token received:', token);
  }
}
