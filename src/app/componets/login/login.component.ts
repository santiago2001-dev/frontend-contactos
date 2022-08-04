import { Component, OnInit } from '@angular/core';
import { DefaultValueAccessor, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

import {creden} from 'src/app/models/login'
import {LoginService} from 'src/app/services/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup

  constructor(
    private router: Router,
    private fb : FormBuilder,
    private lognService : LoginService

  ) {

    this.loginForm = this.fb.group({
     email:['',[Validators.email,Validators.required]],
     password:['',Validators.required]


    })
   }

  ngOnInit(): void {
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
}
