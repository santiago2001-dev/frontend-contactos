import { Injectable } from '@angular/core';
import { roles } from '../models/model.dropdown';

@Injectable()
export class DataService {
 private Roles : roles [] = [
  {
    id : 1,
    name : 'admin'

  },

  {

    id :2 ,
    name :'visitante'
  }
 ] 

getRoles (): roles[]{
  return this.Roles;
}

}
