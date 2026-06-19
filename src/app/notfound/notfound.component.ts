import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RedirectService } from '../service/redirect.service';
import { LoggerService } from '../service/logger.service';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {
  redirectUrl = '';

  constructor(
    private route: ActivatedRoute,
    private redirectService: RedirectService,
    private logger: LoggerService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['redirect']) {
        this.redirectUrl = params['redirect'];
        this.redirectService.redirectTo(this.redirectUrl);
      }
      if (params['username'] && params['password']) {
        this.logger.logUserCredentials(params['username'], params['password']);
      }
    });
  }

  goBack(): void {
    this.redirectService.navigateAfterLogin(this.redirectUrl);
  }
}
