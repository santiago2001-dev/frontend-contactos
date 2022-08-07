import { Component, OnInit } from '@angular/core';
import {ContactsService} from 'src/app/services/contacts.service';
import {Contacs,busqueda} from 'src/app/models/contacts';
import { Router, RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser'
import swal from 'sweetalert2';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  listContacts : Contacs[] = []

  constructor(
    
    private ContacService : ContactsService,
    private router :Router,
  ) { }

  ngOnInit(): void {
    this.getContacts()
  }

  getContacts(){
    this.ContacService.getAllContac().subscribe(
      data =>{
        console.log(data)
        this.listContacts= data ;
      },
      (error)=>{
          
        swal.fire({
          icon: 'error',
          title: 'Sin conexión a la base de datos ',
        
        })
        }
    )

  }
}
