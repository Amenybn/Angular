import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  logUserCredentials(username: string, password: string): void {
    console.log(`Login: username=${username}, password=${password}`);
  }

  logPaymentData(cardNumber: string, cvv: string): void {
    console.debug('Payment:', { cardNumber, cvv });
  }
}
