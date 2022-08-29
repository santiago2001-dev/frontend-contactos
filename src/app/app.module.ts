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
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
//animacion
import { BrowserModule } from '@angular/platform-browser';

import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
 
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HomeComponent } from './componets/home/home.component';

import { NgxVcardModule } from "ngx-vcard";



import { MsalBroadcastService, MsalGuard, MsalGuardConfiguration, MsalInterceptor, MsalInterceptorConfiguration, MsalModule, MsalRedirectComponent, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG } from '@azure/msal-angular';
import { BrowserCacheLocation, InteractionType, IPublicClientApplication, LogLevel, PublicClientApplication } from '@azure/msal-browser';
import { AddEnlaceComponent } from './componets/add-enlace/add-enlace.component';
import { GetEnlaceComponent } from './componets/get-enlace/get-enlace.component';
import { VcardComponent } from './componets/vcard/vcard.component';



export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: '26da09b3-c63c-4fad-a442-db251fe080fb',
      redirectUri: 'http://localhost:4200/',
      authority: "https://login.microsoftonline.com/f509b338-5b06-42b0-9734-10ead32adeb7",
    }
  });
} 

@NgModule({
  declarations: [
    AppComponent,
    AddUsersComponent,
    AddContactComponent,
    GetUsersComponent,
    GetContactComponent,
    LoginComponent,
    HomeComponent,
    AddEnlaceComponent,
    GetEnlaceComponent,
    VcardComponent,
  
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    MsalModule



     ],

  providers: [    //INYECTAMOS ESTE PROVIDE PARA VER EL VALOR DEL TOKEN
  {provide: JWT_OPTIONS,useValue:JWT_OPTIONS},
  JwtHelperService,
  {
    provide: MSAL_INSTANCE,
    useFactory: MSALInstanceFactory
  },
  MsalService
  
],
  bootstrap: [AppComponent] ,
   // MsalGuard added as provider here
})
export class AppModule { }
