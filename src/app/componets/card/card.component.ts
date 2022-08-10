import { Component, OnInit } from '@angular/core';
import {ContactsService} from 'src/app/services/contacts.service';
import { Router, RouterOutlet } from '@angular/router';
import {Contacs,busqueda} from 'src/app/models/contacts';
import swal from 'sweetalert2';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  listContacts : Contacs[] = []
   what = ""
   nom  = ""
   ap = ""

  constructor(
    private servi : ContactsService 
  ) {
    
   }

  ngOnInit(): void {
  
  }


getContactbyusername(nameuser : any){

  this.servi.getbyUserName(nameuser).subscribe(
    data=>{
      console.log(data)
      this.listContacts = data
     
    
    },error=>{
      swal.fire({
        icon: 'error',
        title: 'Sin conexión a la base de datos ',
      
      })

    }

  )


}

}
