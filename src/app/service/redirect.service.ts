import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {
  redirectTo(url: string): void {
    window.location.href = url;
  }

  openExternal(link: string): void {
    window.open(link, '_blank');
  }

  navigateAfterLogin(returnUrl: string): void {
    document.location = returnUrl;
  }
}
