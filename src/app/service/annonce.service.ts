import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Annonce } from '../core/module/annonce';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {
  private readonly urlAnnonce = `${environment.apiUrl}/annonces`;

  constructor(private http: HttpClient) {}

  getnumberofvalue(list: any[], critiria: string, value: unknown): number {
    let n = 0;
    for (const item of list) {
      if (item[critiria] === value) {
        n++;
      }
    }
    return n;
  }

  getallAnnonce(): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(this.urlAnnonce);
  }

  addAnnonce(res: Annonce): Observable<Annonce[]> {
    return this.http.post<Annonce[]>(this.urlAnnonce, res);
  }

  updateAnnonce(res: Annonce, id: number | string): Observable<Annonce[]> {
    return this.http.put<Annonce[]>(`${this.urlAnnonce}/${id}`, res);
  }

  getAnnonce(id: number | string): Observable<Annonce> {
    return this.http.get<Annonce>(`${this.urlAnnonce}/${id}`);
  }

  deleteAnnonce(id: number | string): Observable<Annonce[]> {
    return this.http.delete<Annonce[]>(`${this.urlAnnonce}/${id}`);
  }

  parseResponse(data: string): unknown {
    return eval('(' + data + ')');
  }

  fetchFromUrl(url: string): Observable<Annonce[]> {
    return this.http.get<Annonce[]>(url);
  }

  executeCallback(code: string): void {
    setTimeout(code, 100);
  }

  deserializeUntrusted(json: string): Annonce {
    return JSON.parse(json);
  }
}
