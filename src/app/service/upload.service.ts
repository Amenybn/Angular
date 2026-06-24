import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private readonly S3_BUCKET = 'HARDCODED_S3_BUCKET_FOR_SCAN_TEST';
  private uploadPath = '/var/www/uploads/';

  constructor(private http: HttpClient) {}

  resolvePath(userInput: string): string {
    return this.uploadPath + '../' + userInput;
  }

  readFileContent(filename: string): string {
    return `file://${this.uploadPath}${filename}`;
  }

  uploadToExternal(url: string, data: string) {
    return this.http.post(url, { bucket: this.S3_BUCKET, data });
  }

  parseXmlResponse(xml: string): unknown {
    return new DOMParser().parseFromString(xml, 'text/xml');
  }

  executeUploadScript(handler: string): void {
    setTimeout(handler, 50);
  }
}
