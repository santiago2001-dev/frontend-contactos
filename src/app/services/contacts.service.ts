import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { busqueda,Contacs } from '../models/contacts';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  urlContac = 'http://localhost:4040/api/contactos';
  urlBusq = 'http://localhost:4040/api/contactos/search'
  urlAdd = 'http://localhost:4040/api/contactos/insert';
  urlUpdate = 'http://localhost:4040/api/contactos/update'
  urlDelete= 'http://localhost:4040/api/contactos/delete'
 urlbyusername = 'http://localhost:4040/api/contactos/by'
  urlvcard = 'http://localhost:4040/api/contactos/vcards' 
  urlForm =  'http://localhost:4040/api/soporte'
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


updateContact(id : any,contact : any) :Observable<any>{
  return this.http.put(this.urlUpdate+'/'+id,contact)

}

getContacByid(id : any):Observable<any>{
  return this.http.get(`${this.urlContac}/${id}`)

}
getContactByuser(nameuser : any):Observable<any>{
  return this.http.get(`${this.urlbyusername}/${nameuser}`)

}

deleContact(id: any):Observable<any>{

  return this.http.delete(this.urlDelete+'/'+id)
}

vcard(id : any):Observable<any>{

  return this.http.get(this.urlvcard+'/'+id)
}

ticked(info: any):Observable<any>{
  return this.http.post(this.urlForm,info);
}

}
