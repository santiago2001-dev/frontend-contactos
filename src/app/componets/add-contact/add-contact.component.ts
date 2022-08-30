import { Component, OnInit } from '@angular/core';
import { DefaultValueAccessor, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//liberia para convertir archivo a base 64
import { DomSanitizer } from '@angular/platform-browser';

import swal from 'sweetalert2';
//models 
import {Contacs} from 'src/app/models/contacts';
import {ContactsService} from 'src/app/services/contacts.service'

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  public previsualizacion : string | any;
  ContactForm :  FormGroup;
  Titulo = 'crear contacto'
  Id  : String | null ; 
  

  constructor(
    private router: Router,
    private fb : FormBuilder,
    private sanintezer : DomSanitizer,//libreria para pasar a base 64 
    private contactService : ContactsService,
    private aRouter  : ActivatedRoute    
  ) {

this.ContactForm = this.fb.group({
  id : [''],
  name : ['',Validators.required],
  lastname : ['',Validators.required],
  email : ['',[Validators.required,Validators.email]],
  nameuser : ['',Validators.required],
  cargo : ['',Validators.required],
  area : ['',Validators.required],
  number : ['',[Validators.required,Validators.maxLength(10)]],
  proyecto : ['',Validators.required],
  img :['',Validators.required]

})

this.Id = this.aRouter.snapshot.paramMap.get('id');

   }

  ngOnInit(): void {
    this.esEditar()
  }



  addContact(){
    
    if(this.ContactForm.invalid){
 
      swal.fire({
        icon: 'error',
        title: 'los campos son obligatorios',
      
      })
    
    
    }else{
     const CONTACTS : Contacs ={

    id : this. ContactForm.get('id')?.value,
    name : this. ContactForm.get('name')?.value,
    lastname  : this.ContactForm.get('lastname')?.value,
    nameuser : this.ContactForm.get('nameuser')?.value,
    email  : this. ContactForm.get('email')?.value,
    cargo  : this.ContactForm.get('cargo')?.value,
    area  : this.ContactForm.get('area')?.value,
    proyecto  : this.ContactForm.get('proyecto')?.value,
    number  : this.ContactForm.get('number')?.value,
    img : this.previsualizacion

      };


  if(this.Id!==null){  
    this.contactService.updateContact(this.Id,CONTACTS).subscribe( data=>{
      swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Usuario agregado correctamente',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['/admin/contact']);
    },
      
      error=>{
         swal.fire({
          icon: 'error',
          title: 'algo salio mal intenta de nuevo porfavor ',
        
        })
   

      }
    )
    
  }else{

    this.contactService.createContact(CONTACTS).subscribe(
      data =>{
        swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario agregado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
      
        this.router.navigate(['/admin/contact']); //redirección 

      },
      error=>{
        swal.fire({
          icon: 'error',
          title: 'algo salio mal intenta de nuevo porfavor ',
        
        })
        this.ContactForm.reset(); //limpiar formulario

      }
    )
    
  
  }


  }
  }


get name (){return this.ContactForm.get('name');}
get lastname (){return this.ContactForm.get('lastname');}
get nameuser (){return this.ContactForm.get('nameuser');}
get email (){return this.ContactForm.get('email');}
get number (){return this.ContactForm.get('number');}





capturarFile($event: any): any{
  const archivoCapturado  = $event.target.files[0]
 //  this.archivos.push(archivoCapturado)
  this.extrarBase64(archivoCapturado).then((imagen: any)=>{
    this.previsualizacion = imagen.base
    console.log(imagen);

  })
 

}


extrarBase64 = async ($event: any) => new Promise((resolve, reject) =>  {
 
  const usafeImg = window.URL.createObjectURL($event);
  const image = this.sanintezer.bypassSecurityTrustUrl(usafeImg);
  const reader = new FileReader();
  reader.readAsDataURL($event);
  reader.onload = () =>{
    resolve({
      base : reader.result
    });
  };
  reader.onerror = error =>{
    resolve({
        base: null
    });
  };
  


}
)

esEditar(){

  if(this.Id !== null){
    this.Titulo = 'editar contacto';
    this.contactService.getContacByid(this.Id).subscribe(

      data =>{
      
        this.ContactForm.patchValue({
           id:data[0].id,
           name:data[0].name,
           lastname:data[0].lastname,
           email:data[0].email,
           nameuser:data[0].nameuser,
           cargo:data[0].cargo,
           area:data[0].area,
           number:data[0].number,
           proyecto:data[0].proyecto,
           img:data[0].img

          
        })
      },
      error=>{
        console.log(error)
      }

    )
  }

}
}
