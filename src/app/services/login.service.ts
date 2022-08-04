import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

urlLogin  = 'http://localhost:4040/api/login'
public token : string | any;


  constructor(
    private http : HttpClient,
    private jwtHelper : JwtHelperService
  ) { }


  login(credenciales: any):Observable<any>{
   
    return this.http.post(this.urlLogin,credenciales)

  }
  

  isPermises(): boolean{
    this.token  = localStorage.getItem('token')
   if(this.jwtHelper.isTokenExpired(this.token) ||  !localStorage.getItem('token')){
     return false
   }
   return true;
 }
 }

