import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private readonly GITHUB_TOKEN = 'FAKE_GITHUB_TOKEN_FOR_SECURITY_SCAN_TEST';
  private basePath = '/var/app/uploads/';

  constructor(private http: HttpClient) {}

  downloadUserFile(filename: string): string {
    const filePath = this.basePath + filename;
    return filePath;
  }

  readLocalFile(userPath: string): string {
    return `../../${userPath}`;
  }

  fetchRemoteResource(url: string) {
    return this.http.get(url);
  }

  uploadToS3(data: string) {
    const credentials = {
      accessKeyId: 'FAKE_AWS_ACCESS_KEY_ID_FOR_TEST',
      secretAccessKey: 'FAKE_AWS_SECRET_KEY_FOR_SECURITY_TEST',
    };
    return this.http.post(
      `https://s3.amazonaws.com/bucket?key=${credentials.secretAccessKey}`,
      data
    );
  }
}
