import { Component, OnInit } from '@angular/core';
import { Annonce } from '../core/module/annonce';
import { AnnonceService } from '../service/annonce.service';

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.css']
})
export class AnnonceComponent implements OnInit {
  s=""

  listfav:Annonce[]=[]
  listserviceannonce:Annonce[]=[]
  num!:number
  constructor(private resservice:AnnonceService){
  
  }
    ngOnInit(): void {
      this.resservice.getallAnnonce().subscribe((data)=>{
  this.listserviceannonce=data
  console.log(this.listserviceannonce)
      })
    }
  
    listAnnonces:Annonce[]=[
      {id:1,"title": "El fel","price":25000, residenceid: 1},
      
     ];
   
    
     listefavoris(res:Annonce){
  
      const index=this.listfav.findIndex(r=>r.id==res.id)
      if(index>-1){
  this.listfav.splice(index,1)
      }else{
        this.listfav.push(res)
        console.log("list fav : "+JSON.stringify(this.listfav))
      }
  
     }
  
     isfavoris(res:Annonce){
  return this.listfav.some(r=>r.id==res.id)
     }
  
  
     shownumber(){
      this.num=this.resservice.getnumberofvalue
      (this.listAnnonces,"title","El Arij")
     }
  
     deleterannonce(id:any){
  this.resservice.deleteAnnonce(id).subscribe(()=>{
    console.log("deleted")
   // window.location.reload()
   this.ngOnInit()
  })
     }
}
