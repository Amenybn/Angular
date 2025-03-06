import { Component } from '@angular/core';
import { Annonce } from '../core/module/annonce';
import { AnnonceService } from '../service/annonce.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  id!:number
  listannonce:Annonce=new Annonce
  constructor(private act:ActivatedRoute,private resServ:AnnonceService){}

  ngOnInit(): void {
    this.id=this.act.snapshot.params['id']
    this.resServ.getAnnonce(this.id).subscribe((data)=>{
this.listannonce=data
console.log(this.listannonce)
    })
  }
}
