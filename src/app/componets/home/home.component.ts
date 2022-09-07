import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { Contacs } from '../../models/contacts';
import {info} from '../../models/form';
import {enlaces} from 'src/app/models/enlaces'
import {busqueda} from 'src/app/models/contacts'
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import swal from 'sweetalert2';
import { MsalService } from '@azure/msal-angular';
import {EnlacesService} from 'src/app/services/enlaces.service'
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'vcard'
  elementType = NgxQrcodeElementTypes.URL
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH
  value = 'https://google.com'
  

 name: any 
 listlink : enlaces[] = []
listContact : Contacs[] = []
Contact : Contacs [] = []
info : Form[]= []
search: FormGroup
 filename  : any
 form : FormGroup

  constructor(
    private fb: FormBuilder,
    private router :Router,
    private ContactsService :ContactsService,
    private enlacesserv : EnlacesService,
    private msalservice :MsalService
   


    

  ) {

    this.form = fb.group({
      name:['',Validators.required],
      email: ['',[Validators.email,Validators.required]],
      info:['',[Validators.required]]

    })
    this.search = fb.group({
      busqueda : ['',Validators.required]
      })
   }

  ngOnInit(): void {
    this.obtenerContactos();
    this.getlinks();
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


getlinks(){

  this.enlacesserv.getAlink().subscribe(
    data =>{
      this.listlink = data;
    },error=>{
      swal.fire({
        icon: 'error',
        title: 'contacto no estaq registro en la base de datos ',
      
      })
    }
  )
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

sendTiked(){

  console.log(this.form)
  if(this.form.invalid){
 
    swal.fire({
      icon: 'error',
      title: 'los campos son obligatorios',
    
    })
  
  
  }else{
    const info : info= {
      info : this.form.get('info')?.value,
      emailUs:  this.form.get('email')?.value,
      name : this.form.get('name')?.value
    }

    this.ContactsService.ticked(info).subscribe(
      data=>{
  
        swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Correo envíado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
  
        
  
      },
      (error)=>{
  
        console.log(error)
        
        swal.fire({
          icon: 'error',
          title: `algo salio mal intenta de nuevo`,
        
        })
        
      }
      
    )
  }

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


