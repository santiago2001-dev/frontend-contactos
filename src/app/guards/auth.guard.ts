import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree ,Router} from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from 'src/app/services/login.service'
import swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
  private authService : LoginService,
  private router : Router
  ){}

  
  canActivate():boolean{
    if(!this.authService.isPermises()){
     
      swal.fire({
        icon: 'error',
        title: 'Usuario o contraseña incorrectos',
      
      })
      this.router.navigate(['inicio'])
      return false
    }
  
    return true;
}
  }
