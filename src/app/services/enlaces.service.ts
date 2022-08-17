import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EnlacesService {
  url = 'http://localhost:4040/api/enlaces';
  urlinsert = 'http://localhost:4040/api/enlaces/insert';
  urlUpdate = 'http://localhost:4040/api/enlaces/update';
  urlDelete = 'http://localhost:4040/api/enlaces/delete';

  constructor(  private http : HttpClient) { }


  getAlink() : Observable<any>{
    return this.http.get(this.url);
    
      }

   createLink(enlaces :any){
        return this.http.post(this.urlinsert,enlaces);
      
      }

     updatelink(id : any,enlaces : any) :Observable<any>{
        return this.http.put(this.urlUpdate+'/'+id,enlaces)
      
      }
      
      getByid(id : any):Observable<any>{
        return this.http.get(`${this.url}/${id}`)
      
      }
      
      delelink(id: any):Observable<any>{
      
        return this.http.delete(this.urlDelete+'/'+id)
      }



    }
