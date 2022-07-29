import { Component, OnInit } from '@angular/core';
import {Contacs,busqueda} from 'src/app/models/contacts';
import {ContactsService} from 'src/app/services/contacts.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

 
import swal from 'sweetalert2';
import { ThisReceiver } from '@angular/compiler';
@Component({
  selector: 'app-get-contact',
  templateUrl: './get-contact.component.html',
  styleUrls: ['./get-contact.component.css']
})
export class GetContactComponent implements OnInit {
search: FormGroup
listContacts : Contacs[] = []
titulo = 'CREAR CONTACTO';
  constructor(
    private fb: FormBuilder,
    private router :Router,
    private ContacService : ContactsService
  ) { 
  this.search = fb.group({
  busqueda : ['',Validators.required]
  })


  }

  ngOnInit(): void {
    this.getContacts()
  }


  getContacts(){
    const busqueda : busqueda = {
        busqueda :  this.search.get('busqueda')?.value

    }
    this.ContacService.getAllContac().subscribe(
      (data)=>{
        this.listContacts = data;
        
      },
      (error)=>{
          
      swal.fire({
        icon: 'error',
        title: 'Sin conexión a la base de datos ',
      
      })
      }
    )
 
    if (this.search.valid) {
    
      this.ContacService.searchContact(busqueda).subscribe(
        (data) => {
          console.log(data);
          this.listContacts = data;
        },
        (error) => {
          
          swal.fire({
            icon: 'error',
            title: 'Sin conexión a la base de datos ',
          
          })
    }
      );
    }   


  }

}
