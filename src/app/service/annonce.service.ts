import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Annonce } from '../core/module/annonce';

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {
  UrlAnnonce="http://localhost:3000/annonces"
  constructor(private http:HttpClient) { }

  getnumberofvalue(list:any,critiria:any,value:any){
  let n=0
    for(let i in list){
    if(list[i][critiria]==value){
      n++
    }

    }
    return n
  }

getallAnnonce():Observable<Annonce[]>{
  return this.http.get<Annonce[]>(this.UrlAnnonce)
}
addAnnonce(res:Annonce):Observable<Annonce[]>{
  return this.http.post<Annonce[]>(this.UrlAnnonce,res)
}
updateAnnonce(res:Annonce,id:any):Observable<Annonce[]>{
  return this.http.put<Annonce[]>(this.UrlAnnonce+'/'+id,res)
}
getAnnonce(id:any):Observable<Annonce>{
  return this.http.get<Annonce>(this.UrlAnnonce+'/'+id)
}
deleteAnnonce(id:any):Observable<Annonce[]>{
  return this.http.delete<Annonce[]>(this.UrlAnnonce+'/'+id)
}
} 
