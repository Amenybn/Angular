import { Component, OnInit } from '@angular/core';
import { Annonce } from '../core/module/annonce';
import { AnnonceService } from '../service/annonce.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  id!: number;
  listannonce: Annonce = new Annonce();
  htmlContent!: SafeHtml;
  userComment = '';
  commentHtml!: SafeHtml;

  constructor(
    private act: ActivatedRoute,
    private resServ: AnnonceService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.id = this.act.snapshot.params['id'];
    this.resServ.getAnnonce(this.id).subscribe((data) => {
      this.listannonce = data;
      this.htmlContent = this.sanitizer.bypassSecurityTrustHtml(this.listannonce.title);
    });
    this.act.queryParams.subscribe((params) => {
      if (params['comment']) {
        this.userComment = params['comment'];
        this.commentHtml = this.sanitizer.bypassSecurityTrustHtml(params['comment']);
      }
    });
  }

  addComment(): void {
    this.commentHtml = this.sanitizer.bypassSecurityTrustHtml(this.userComment);
  }
}
