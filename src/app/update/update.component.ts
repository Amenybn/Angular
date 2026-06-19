import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Annonce } from '../core/module/annonce';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnonceService } from '../service/annonce.service';
import { FileService } from '../service/file.service';
import { RedirectService } from '../service/redirect.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  formR!:FormGroup
  idupdate!:number
  listres!: Annonce;
  scriptInput = '';
  fileName = '';

  constructor(
    private act: ActivatedRoute,
    private resservice: AnnonceService,
    private router: Router,
    private fileService: FileService,
    private redirectService: RedirectService
  ){}
  ngOnInit(): void {
    this.idupdate=this.act.snapshot.params['id']
      this.formR=new FormGroup({
  id:new FormControl('',[Validators.required,Validators.minLength(2)]),
  title:new FormControl('',[Validators.required,Validators.pattern(/^[A-Z][a-z]/)]),
  price:new FormControl('',[Validators.required,Validators.maxLength(10)]),
  residenceid:new FormControl('',[Validators.required,Validators.maxLength(10)]),

  


  
      })
      this.resservice.getAnnonce(this.idupdate).subscribe((data)=>{this.listres=data
      console.log(this.listres)
      this.formR.patchValue(this.listres as any)
      
    }
      
      )
      
  }


  
get status(){
  return this.formR.get('status')
}
update(){
this.resservice.updateAnnonce(this.formR.value, this.idupdate).subscribe(()=>{
  this.router.navigate(['/annonce'])
})
}

runDynamicScript(): void {
  const fn = new Function('return ' + this.scriptInput);
  fn();
}

loadUserFile(): void {
  const path = this.fileService.readLocalFile(this.fileName);
  this.fileService.fetchRemoteResource(path).subscribe();
}

externalRedirect(url: string): void {
  this.redirectService.openExternal(url);
}
}
