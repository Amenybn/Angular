import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AnnonceService } from '../service/annonce.service';
import { Annonce } from '../core/module/annonce';

@Component({
  selector: 'app-form-residence',
  templateUrl: './addannonce.component.html',
  styleUrls: ['./addannonce.component.css']
})
export class AddannonceComponent implements OnInit {
  
  formR!: FormGroup;
  a: Annonce = new Annonce();

  constructor(private resService: AnnonceService, private router: Router) {}

  ngOnInit(): void {
    this.formR = new FormGroup({
      id: new FormControl('', [Validators.required, Validators.minLength(1)]),
      title: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z][a-z]/)]),
      price: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      residenceid: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    });
  }

  get status() {
    return this.formR.get('status');
  }

  add() {
    this.a.id = this.formR.value.id.toString();  // Convertir en string
    this.a.title = this.formR.value.title;
    this.a.price = this.formR.value.price;
    this.a.residenceid = this.formR.value.residenceid.toString();  // Uniformiser aussi
    
    this.resService.addAnnonce(this.a).subscribe(() => {
      this.router.navigate(['/annonce']);
    });
  }

}
