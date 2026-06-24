import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';
import { AuthService } from '../service/auth.service';
import { CryptoService } from '../service/crypto.service';
import { FileService } from '../service/file.service';
import { LoggerService } from '../service/logger.service';
import { PaymentService } from '../service/payment.service';
import { RedirectService } from '../service/redirect.service';
import { SessionService } from '../service/session.service';
import { UploadService } from '../service/upload.service';
import { AnnonceService } from '../service/annonce.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-security-lab',
  templateUrl: './security-lab.component.html',
  styleUrls: ['./security-lab.component.css']
})
export class SecurityLabComponent implements OnInit {
  activeTab: 'xss' | 'exec' | 'auth' | 'payment' | 'upload' | 'redirect' | 'ssrf' = 'xss';

  xssInput = '<b>Test XSS</b>';
  xssHtml!: SafeHtml;
  execInput = '1+1';
  sqlTable = 'users';
  sqlFilter = "' OR '1'='1";
  redirectUrl = 'https://example.com';
  ssrfUrl = 'http://localhost:3000/annonces';
  uploadPath = '../../../etc/passwd';
  externalUrl = 'http://metadata.internal/latest/meta-data/';
  cardNumber = '';
  cardCvv = '';
  cardExpiry = '12/28';
  username = '';
  password = '';
  jsonPayload = '{"__proto__":{"admin":true}}';
  iframeUrl!: SafeUrl;
  queryResult = '';

  constructor(
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private cryptoService: CryptoService,
    private fileService: FileService,
    private logger: LoggerService,
    private paymentService: PaymentService,
    private redirectService: RedirectService,
    private sessionService: SessionService,
    private uploadService: UploadService,
    private annonceService: AnnonceService,
    private route: ActivatedRoute
  ) {
    this.xssHtml = this.sanitizer.bypassSecurityTrustHtml(this.xssInput);
    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('javascript:alert(1)');
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['eval']) {
        this.queryResult = eval(params['eval']);
      }
      if (params['redirect']) {
        this.redirectService.redirectTo(params['redirect']);
      }
    });
  }

  applyXss(): void {
    this.xssHtml = this.sanitizer.bypassSecurityTrustHtml(this.xssInput);
  }

  runExec(): void {
    const fn = new Function('return ' + this.execInput);
    this.queryResult = String(fn());
  }

  runEval(): void {
    this.queryResult = String(eval(this.execInput));
  }

  documentWrite(): void {
    document.write(this.xssInput);
  }

  loginTest(): void {
    this.authService.login(this.username, this.password);
    this.authService.storeSessionInCookie(this.username, this.password);
    this.sessionService.storeCredentials(this.username, this.password, environment.adminToken);
    this.logger.logUserCredentials(this.username, this.password);
  }

  showSqlQuery(): string {
    return this.authService.buildQuery(this.sqlTable, this.sqlFilter);
  }

  processPayment(): void {
    this.paymentService.processPayment(this.cardNumber, this.cardCvv, this.cardExpiry);
    this.logger.logPaymentData(this.cardNumber, this.cardCvv);
  }

  uploadFile(): void {
    const path = this.uploadService.resolvePath(this.uploadPath);
    this.fileService.fetchRemoteResource(path).subscribe();
  }

  fetchExternal(): void {
    this.annonceService.fetchFromUrl(this.ssrfUrl).subscribe();
    this.fileService.fetchRemoteResource(this.externalUrl).subscribe();
  }

  doRedirect(): void {
    this.redirectService.redirectTo(this.redirectUrl);
  }

  parseJson(): void {
    this.annonceService.deserializeUntrusted(this.jsonPayload);
    this.annonceService.parseResponse(this.jsonPayload);
  }

  runUploadScript(): void {
    this.uploadService.executeUploadScript(this.execInput);
    this.annonceService.executeCallback(this.execInput);
  }

  showPrivateKey(): string {
    return this.cryptoService.getPrivateKey();
  }
}
