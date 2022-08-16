import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { Contacs } from '../../models/contacts';
import {busqueda} from 'src/app/models/contacts'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import swal from 'sweetalert2';
import { MsalService } from '@azure/msal-angular';

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
 filename  : any

  constructor(
    private fb: FormBuilder,
    private router :Router,
    private ContactsService :ContactsService,
    private msalservice :MsalService
   


    

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



vcard(id: any){

this.ContactsService.vcard(id).subscribe(
    data=>{
    
     this.filename = data.vcard
 
    this.downloadPDF(this.filename)

  
 },error=>{
      console.log(error)
      swal.fire({
        icon: 'error',
        title: 'Sin conexión a la base de datos ',
      
      })

    }
  )

}



 downloadPDF(pdf : any) {
  const linkSource = `data:application/pdf;base64,${pdf}`;
  const downloadLink = document.createElement("a");
  const fileName = "vcard.vcf";

  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
}



//microsoft
getName () : string | undefined {
  if (this.msalservice.instance.getActiveAccount() == null) {
    return 'unknown'
  }

  return this.msalservice.instance.getActiveAccount()?.name
}


logoutMicrosot(){
  this.msalservice.logout()
  
}

}


