import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginMicrosoftGuard implements CanActivate {
  constructor(private authService: MsalService,private router :Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.instance.getActiveAccount() == null) {
      this.router.navigate(['/inicio'])
      return false;
    }
    
   
    return true;
  }

  
}
