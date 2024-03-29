import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { busqueda } from '../models/contacts';
import { Users } from 'src/app/models/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  urlUsers = 'http://localhost:4040/api/users';
  urlBusq = 'http://localhost:4040/api/users/search';
  urlAdd = 'http://localhost:4040/api/users/register';
  urlUpdate = 'http://localhost:4040/api/users/update'
  urlDelete = 'http://localhost:4040/api/users/delete'

  constructor(
    private http : HttpClient


  ) { }


getAllUsers(): Observable<any>{
  return this.http.get(this.urlUsers);

}



searchUsers(busqueda : busqueda):Observable<any>{
  
return this.http.post(this.urlBusq,busqueda)

}

createUser(user : any):Observable<any>{
  return this.http.post(this.urlAdd,user)

}  

updateUser(id :any,user : any): Observable<any>{
  return this.http.put(this.urlUpdate+'/'+id,user)
}


getUsrerByid(id : any):Observable<any>{
return this.http.get(`${this.urlUsers}/${id}`)

}
deleteUsers(id: any):Observable<any>{

  return this.http.delete(this.urlDelete+'/'+id)
}
  }
  


