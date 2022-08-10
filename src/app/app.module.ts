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
import { CardComponent } from './componets/card/card.component';
import { NgxVcardModule } from "ngx-vcard";



import { MsalBroadcastService, MsalGuard, MsalGuardConfiguration, MsalInterceptor, MsalInterceptorConfiguration, MsalModule, MsalRedirectComponent, MsalService, MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG } from '@azure/msal-angular';
import { BrowserCacheLocation, InteractionType, IPublicClientApplication, LogLevel, PublicClientApplication } from '@azure/msal-browser';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1; // Remove this line to use Angular Universal
export function loggerCallback(logLevel: LogLevel, message: string) {
  console.log(message);
}

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      // clientId: '6226576d-37e9-49eb-b201-ec1eeb0029b6', // Prod enviroment. Uncomment to use. 
      clientId: '028bc0c4-6bbe-4f48-bacb-1823bbac5e4b', // PPE testing environment
      // authority: 'https://login.microsoftonline.com/common', // Prod environment. Uncomment to use.
      authority: 'https://login.microsoftonline.com/f509b338-5b06-42b0-9734-10ead32adeb7', // PPE testing environment.
      redirectUri: '/',
      postLogoutRedirectUri: '/inicio',
      
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: isIE, // set to true for IE 11. Remove this line to use Angular Universal
    },
    system: {
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false
      }
    }
  });
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  // protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read']); // Prod environment. Uncomment to use.
  protectedResourceMap.set('https://graph.microsoft-ppe.com/v1.0/me', ['user.read']);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return { 
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read']
    },
    loginFailedRoute: '/login-failed'
  };
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
    CardComponent
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxQRCodeModule,
    NgxVcardModule,
    MsalModule



     ],

  providers: [    //INYECTAMOS ESTE PROVIDE PARA VER EL VALOR DEL TOKEN
  {provide: JWT_OPTIONS,useValue:JWT_OPTIONS},
  JwtHelperService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi: true
  },
  {
    provide: MSAL_INSTANCE,
    useFactory: MSALInstanceFactory
  },
  {
    provide: MSAL_GUARD_CONFIG,
    useFactory: MSALGuardConfigFactory
  },
  {
    provide: MSAL_INTERCEPTOR_CONFIG,
    useFactory: MSALInterceptorConfigFactory
  },
  MsalService,
  MsalGuard,
  MsalBroadcastService
  
],
  bootstrap: [AppComponent,MsalRedirectComponent] ,
   // MsalGuard added as provider here
})
export class AppModule { }
