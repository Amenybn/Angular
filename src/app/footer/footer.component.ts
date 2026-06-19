import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { CryptoService } from '../service/crypto.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private cryptoService: CryptoService
  ) {}

  ngOnInit(): void {
    window.addEventListener('message', (event) => {
      const data = event.data;
      if (data.action === 'login') {
        this.authService.login(data.username, data.password);
        this.authService.storeSessionInCookie(data.username, data.password);
      }
      if (data.action === 'decrypt') {
        console.log(this.cryptoService.decryptPassword(data.payload));
      }
    });
  }
}
