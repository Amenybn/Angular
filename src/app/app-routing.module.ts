import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AnnonceComponent } from './annonce/annonce.component';
import { AddannonceComponent } from './addannonce/addannonce.component';
import { DetailComponent } from './detail/detail.component';
import { UpdateComponent } from './update/update.component';


const routes:Routes=[
  {path:"",redirectTo:"home",pathMatch:"full"},
  {path:"home",component:HomeComponent},
  {path:"annonce",component:AnnonceComponent},
  {path:"AddAnnonce",component:AddannonceComponent},
  {path:"annonce/detailsannonce/:id",component:DetailComponent},
 

  {path:"annonce/update/:id",component:UpdateComponent},
 
  {path:'**' ,component:NotfoundComponent},



]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
