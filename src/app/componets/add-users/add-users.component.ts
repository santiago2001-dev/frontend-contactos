import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//liberia para convertir archivo a base 64
import { DomSanitizer } from '@angular/platform-browser';

import swal from 'sweetalert2';
//models 
import {Users}  from 'src/app/models/users'
import {ContactsService} from 'src/app/services/contacts.service'
import { UsersService } from '../../services/users.service';
@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css'],
  
})
export class AddUsersComponent implements OnInit {

public previsualizacion : string | any;
userForm : FormGroup;
Id  : String | null ; 
Titulo = 'Crear Usuario'

  constructor( 
    
    private router: Router,
    private fb : FormBuilder,
    private sanintezer : DomSanitizer,//libreria para pasar a base 64 
    private userService : UsersService,
    private aRouter  : ActivatedRoute  
  
    ) 
    {
    this.userForm = this.fb.group ({
      id: [], 
      name: ['',Validators.required],
      lastname : ['',Validators.required],
      email: ['',[Validators.email,Validators.required]],
      password : ['',[Validators.minLength(8),Validators.required]],
      rol : ['',Validators.required],
      img : ['',Validators.required]


    })
    this.Id = this.aRouter.snapshot.paramMap.get('id');


   }

  ngOnInit(): void {
    this.esEditar()
    

    }





addUser(){


if(this.userForm.invalid){
 
  swal.fire({
    icon: 'error',
    title: 'los campos son obligatorios',
  
  })


}else{
 
  const user :Users ={
   
    name : this.userForm.get('name')?.value,
    lastname  : this.userForm.get('lastname')?.value,
    email  : this.userForm.get('email')?.value,
    password  : this.userForm.get('password')?.value,
    role  : this.userForm.get('rol')?.value,
    img : this.previsualizacion,
    id : this.userForm.get('id')?.value
  };

if(this.Id !== null){
this.userService.updateUser(this.Id,user).subscribe(
  data=>{
    swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Usuario agregado correctamente',
      showConfirmButton: false,
      timer: 1500
    })
    this.router.navigate(['/admin/users']);
  },
  error=>{
    swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Usuario agregado correctamente',
      showConfirmButton: false,
      timer: 1500
    })
    
  }
)

}else{

  this.userService.createUser(user).subscribe(
    data=>{
  
      swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Usuario agregado correctamente',
        showConfirmButton: false,
        timer: 1500
      })

      
    this.router.navigate(['/admin/users']); //redirección
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



}

get name (){return this.userForm.get('name');}
get lastname (){return this.userForm.get('lastname');}
get password (){return this.userForm.get('password');}
get email (){return this.userForm.get('email');}

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
  })


esEditar(){


  if(this.Id !==null){

    this.Titulo = 'Editar Usuario'
    this.userService.getUsrerByid(this.Id).subscribe(
      data=>{
        this.userForm.patchValue({
          name:data[0].name,
          lastname:data[0].lastname,
          email:data[0].email,
          password:data[0].password,
          rol:data[0].role,
          img:data[0].img,
          id:data[0].id


        })
      }
      
    )
 
  }
}

}

