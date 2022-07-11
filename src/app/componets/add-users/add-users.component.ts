import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//liberia para convertir archivo a base 64
import { DomSanitizer } from '@angular/platform-browser';


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
      lastanme : ['',Validators.required],
      email: ['',Validators.required,Validators.email],
      password : ['',Validators.minLength(8)],
      rol : ['',Validators.required]


    })

   }

  ngOnInit(): void {
    

    }



captureInfo(){
  console.log(this.userForm);
}



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

