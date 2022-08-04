import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//componets
import { AddUsersComponent } from './componets/add-users/add-users.component';
import { AddContactComponent } from './componets/add-contact/add-contact.component';
import { GetUsersComponent } from './componets/get-users/get-users.component';
import { GetContactComponent } from './componets/get-contact/get-contact.component';
import { LoginComponent } from './componets/login/login.component';

// imports
import { ReactiveFormsModule } from '@angular/forms';
//petciones http
import {HttpClientModule} from '@angular/common/http';
//animacion
import { BrowserModule } from '@angular/platform-browser';

import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';



@NgModule({
  declarations: [
    AppComponent,
    AddUsersComponent,
    AddContactComponent,
    GetUsersComponent,
    GetContactComponent,
    LoginComponent
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule
    
    
    
  ],
  providers: [    //INYECTAMOS ESTE PROVIDE PARA VER EL VALOR DEL TOKEN
  {provide: JWT_OPTIONS,useValue:JWT_OPTIONS},
  JwtHelperService],
  bootstrap: [AppComponent] 
})
export class AppModule { }
