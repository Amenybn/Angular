import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {
  redirectTo(url: string): void {
    window.location.href = url;
  }

  navigateAfterLogin(returnUrl: string): void {
    document.location = returnUrl;
  }
}
