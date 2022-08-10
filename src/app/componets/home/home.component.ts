import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { Contacs } from '../../models/contacts';
import {busqueda} from 'src/app/models/contacts'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import swal from 'sweetalert2';

import { Name, VCard, VCardEncoding } from 'ngx-vcard';
import { last } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 name: any 
listContact : Contacs[] = []
Contact : Contacs [] = []
search: FormGroup

public vCardEncoding: typeof VCardEncoding = VCardEncoding;
public vCard: VCard = { name: { firstNames: 'John', lastNames: 'Doe' } };
  constructor(
    private fb: FormBuilder,
    private router :Router,
    private ContactsService :ContactsService,
   


    

  ) {
    this.search = fb.group({
      busqueda : ['',Validators.required]
      })
   }

  ngOnInit(): void {
    this.obtenerContactos();
  }





obtenerContactos(){
  const busqueda : busqueda = {
    busqueda :  this.search.get('busqueda')?.value
  }

  this.ContactsService.getAllContac().subscribe(
    data =>{
      this.listContact = data;
    },
    error=>{
      swal.fire({
        icon: 'error',
        title: 'Sin conexión a la base de datos ',
      
      })
    
    }
  )

  if (this.search.valid) {

    this.ContactsService.searchContact(busqueda).subscribe(
      data =>{
        this.listContact = data;
      },
      error=>{
        swal.fire({
          icon: 'error',
          title: 'contacto no estaq registro en la base de datos ',
        
        })
      
      }


    )
  }
}

public generateVCardOnTheFly = (): VCard => {
 
  // TODO: Generate the VCard before Download
  return  {
    name: { firstNames: this.name, lastNames: "Doe", addtionalNames: "Auto" },
  };
};

getContactbyusername(id: any){

  this.ContactsService.getContacByid(id).subscribe(
    data=>{
  this.name = data[0].name
  console.log(this.name)
 },error=>{
      console.log(error)
      swal.fire({
        icon: 'error',
        title: 'Sin conexión a la base de datos ',
      
      })

    }

  )
  let btn =  document.getElementById('downloadButtonFunction')
  btn?.click()

}



}
