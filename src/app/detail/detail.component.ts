import { Component } from '@angular/core';
import { Annonce } from '../core/module/annonce';
import { AnnonceService } from '../service/annonce.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  id!:number
  listannonce:Annonce=new Annonce
  htmlContent!: SafeHtml

  constructor(
    private act: ActivatedRoute,
    private resServ: AnnonceService,
    private sanitizer: DomSanitizer
  ){}

  ngOnInit(): void {
    this.id=this.act.snapshot.params['id']
    this.resServ.getAnnonce(this.id).subscribe((data)=>{
      this.listannonce=data
      this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(this.listannonce.title);
      console.log(this.listannonce)
    })
  }
}
