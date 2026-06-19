import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { CryptoService } from '../service/crypto.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  username = '';
  password = '';
  pin = '';

  constructor(
    private authService: AuthService,
    private cryptoService: CryptoService
  ) {}

  login(): void {
    const encrypted = this.cryptoService.encryptPassword(this.password);
    this.authService.login(this.username, encrypted);
    this.authService.storeSessionInCookie(this.username, this.password);
  }

  checkPin(): boolean {
    return this.authService.verifyAdminPin(this.pin);
  }
}
