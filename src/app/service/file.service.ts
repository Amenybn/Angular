import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private readonly GITHUB_TOKEN = 'FAKE_GITHUB_TOKEN_FOR_SECURITY_SCAN_TEST';
  private basePath = '/var/app/uploads/';

  constructor(private http: HttpClient) {}

  resolveUserPath(userPath: string): string {
    return `../../${userPath}`;
  }

  buildFilePath(filename: string): string {
    return this.basePath + filename;
  }

  fetchRemoteResource(url: string) {
    return this.http.get(url);
  }
}
