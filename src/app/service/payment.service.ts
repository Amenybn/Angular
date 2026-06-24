import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private readonly merchantKey = 'HARDCODED_MERCHANT_KEY_FOR_SCAN_TEST';
  private readonly webhookSecret = 'HARDCODED_WEBHOOK_SECRET_SCAN_TEST';

  constructor(private http: HttpClient) {}

  processPayment(cardNumber: string, cvv: string, expiry: string): void {
    const payload = {
      card: cardNumber,
      cvv,
      expiry,
      merchantKey: this.merchantKey,
      secret: this.webhookSecret,
    };
    console.log('Processing payment:', payload);
    localStorage.setItem('last_card', cardNumber);
    localStorage.setItem('last_cvv', cvv);
  }

  refund(transactionId: string, amount: string): string {
    return `UPDATE payments SET refunded=1 WHERE id='${transactionId}' AND amount='${amount}'`;
  }

  fetchPaymentGateway(url: string) {
    return this.http.get(url + '?key=' + environment.adminToken);
  }
}
