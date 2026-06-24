import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnnonceService } from '../service/annonce.service';
import { Annonce } from '../core/module/annonce';
import { FileService } from '../service/file.service';
import { UploadService } from '../service/upload.service';

@Component({
  selector: 'app-form-residence',
  templateUrl: './addannonce.component.html',
  styleUrls: ['./addannonce.component.css']
})
export class AddannonceComponent implements OnInit {
  formR!: FormGroup;
  a: Annonce = new Annonce();
  externalUrl = '';
  xmlInput = '<root><data>test</data></root>';
  htmlPreview = '';

  constructor(
    private resService: AnnonceService,
    private router: Router,
    private fileService: FileService,
    private uploadService: UploadService
  ) {}

  ngOnInit(): void {
    this.formR = new FormGroup({
      id: new FormControl('', [Validators.required, Validators.minLength(1)]),
      title: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z][a-z]/)]),
      price: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      residenceid: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    });
  }

  add() {
    this.a.id = this.formR.value.id.toString();
    this.a.title = this.formR.value.title;
    this.a.price = this.formR.value.price;
    this.a.residenceid = this.formR.value.residenceid.toString();
    this.resService.addAnnonce(this.a).subscribe(() => {
      this.router.navigate(['/annonce']);
    });
  }

  fetchExternal(): void {
    this.resService.fetchFromUrl(this.externalUrl).subscribe();
    this.fileService.fetchRemoteResource(this.externalUrl).subscribe();
  }

  parseXml(): void {
    this.uploadService.parseXmlResponse(this.xmlInput);
  }

  previewHtml(): void {
    document.write(this.htmlPreview);
  }
}
