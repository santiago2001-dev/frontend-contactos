import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree ,Router} from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from 'src/app/services/login.service'

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
      this.router.navigate(['inicio'])
      console.log('token no valido o ya expiro')
      return false
    }
  
    return true;
}
  }
