import { Component, Inject, OnInit } from '@angular/core';
import { DefaultValueAccessor, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

import {creden} from 'src/app/models/login'
import {LoginService} from 'src/app/services/login.service'
import { MSAL_GUARD_CONFIG, MsalGuardConfiguration, MsalService, MsalBroadcastService } from '@azure/msal-angular';
import { PopupRequest, AuthenticationResult } from '@azure/msal-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup
  isIframe = false;
  loginDisplay = false;
  constructor(
    private router: Router,
    private fb : FormBuilder,
    private lognService : LoginService,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService

  ) {

    this.loginForm = this.fb.group({
     email:['',[Validators.email,Validators.required]],
     password:['',Validators.required]


    })
   }

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;
  }


  autentication(){
    if(this.loginForm.invalid){
      swal.fire({
        icon: 'error',
        title: 'los campos son obligatorios',
      
      })

    }else{
     const credenciales : creden = {
        email : this.loginForm.get('email')?.value,
        password :  this.loginForm.get('password')?.value


      }
      this.lognService.login(credenciales).subscribe(
        (data: any)=>{
          
          
            localStorage.setItem('token',data.token);
            this.router.navigate(['admin/users'])
          
       },error=>{
          swal.fire({
            icon: 'error',
            title: 'Usuario o contraseña incorrectos',
          
          })
        }
      )

    }


  }



get email(){
  return this.loginForm.get('email')
}


get password(){
  return this.loginForm.get('password')
}


loginPopup() {
  console.log("ma ward",this.msalGuardConfig.authRequest)
  if (this.msalGuardConfig.authRequest){

    this.authService.loginPopup({...this.msalGuardConfig.authRequest} as PopupRequest)
      .subscribe((response: AuthenticationResult) => {
        console.log("response 1: ",response)
        this.authService.instance.setActiveAccount(response.account);
      });
    } else {
      this.authService.loginPopup()
        .subscribe((response: AuthenticationResult) => {
          console.log("response 2 : ",response)
          this.authService.instance.setActiveAccount(response.account);
    });
  }
}
}
