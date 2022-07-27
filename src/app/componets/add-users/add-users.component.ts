import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//liberia para convertir archivo a base 64
import { DomSanitizer } from '@angular/platform-browser';

//models 
import {Users}  from 'src/app/models/users'
@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css'],
  
})
export class AddUsersComponent implements OnInit {

public previsualizacion : string | any;
userForm : FormGroup;


  constructor( 
    
  
    private fb : FormBuilder,
    private sanintezer : DomSanitizer,//libreria para pasar a base 64 

  
    ) 
    {
    this.userForm = this.fb.group ({
      id : ['',Validators.required],
      name: ['',Validators.required],
      lastname : ['',Validators.required],
      email: ['',[Validators.email,Validators.required]],
      password : ['',[Validators.minLength(8),Validators.required,Validators.pattern]],
      rol : ['',Validators.required]


    })



   }

  ngOnInit(): void {
    

    }





addUser(){
if(this.userForm.valid){
  const USERS :Users ={
    id : this.userForm.get('id')?.value,
    name : this.userForm.get('name')?.value,
    lastName  : this.userForm.get('lastname')?.value,
    email  : this.userForm.get('email')?.value,
    password  : this.userForm.get('pasword')?.value,
    role  : this.userForm.get('role')?.value,
    img : this.previsualizacion
  };
  console.log(USERS);
}else{
  console.log('no valido')

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
   


}
)}

