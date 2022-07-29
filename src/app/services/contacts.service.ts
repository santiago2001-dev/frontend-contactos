import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { busqueda,Contacs } from '../models/contacts';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  urlContac = 'http://localhost:4040/api/contactos';
  urlBusq = 'http://localhost:4040/api/contactos/search'
  urlAdd = 'http://localhost:4040/api/contactos/insert';

  constructor(
    private http : HttpClient
  ) { }


getAllContac() : Observable<any>{
return this.http.get(this.urlContac);

  }

  searchContact(busqueda : busqueda):Observable<any>{

    return this.http.post(this.urlBusq,busqueda)
  }

createContact(contact :any){
  return this.http.post(this.urlAdd,contact);

}

}
