import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//liberia para convertir archivo a base 64
import { DomSanitizer } from '@angular/platform-browser';

import swal from 'sweetalert2';
import {enlaces} from 'src/app/models/enlaces'
import {EnlacesService}  from 'src/app/services/enlaces.service'
@Component({
  selector: 'app-add-enlace',
  templateUrl: './add-enlace.component.html',
  styleUrls: ['./add-enlace.component.css']
})
export class AddEnlaceComponent implements OnInit {
  public previsualizacion : string | any;
  enlaceForm : FormGroup;
  Id  : String | null ; 
Titulo = 'Insertar Enlace'

  constructor(
    private router: Router,
    private fb : FormBuilder,
    private sanintezer : DomSanitizer,//libreria para pasar a base 64 
    private enlacesser : EnlacesService,
    private aRouter  : ActivatedRoute  
  

  ) { 

    this.enlaceForm = this.fb.group({
      id : [],
      nombre : ['',Validators.required],
      enlace : ['',Validators.required],
      img :[ '',Validators.required]

    })
    this.Id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar()
  }



  addLink(){

    if(this.enlaceForm.invalid){
 
      swal.fire({
        icon: 'error',
        title: 'los campos son obligatorios',
      
      })
    
    
    }else{
     
      const enlaces :enlaces ={
       
        nombre: this.enlaceForm.get('nombre')?.value,
        
        enlace  : this.enlaceForm.get('enlace')?.value,
       
        img : this.previsualizacion,
        id : this.enlaceForm.get('id')?.value
      };
    
    if(this.Id !== null){
    this.enlacesser.updatelink(this.Id,enlaces).subscribe(
      data=>{
        swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario agregado correctamente',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/admin/enlaces']);
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
    
      this.enlacesser.createLink(enlaces).subscribe(
        data=>{
      
          swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario agregado correctamente',
            showConfirmButton: false,
            timer: 1500
          })
    
          
        this.router.navigate(['/admin/enlaces']); //redirección
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



  get nombre (){return this.enlaceForm.get('nombre');}
  get enlace (){return this.enlaceForm.get('enlace');}




  esEditar(){


    if(this.Id !==null){
  
      this.Titulo = 'Editar Enlace'
      this.enlacesser.getByid(this.Id).subscribe(
        data=>{
          this.enlaceForm.patchValue({
            nombre:data[0].nombre,
            enlace:data[0].enlace,
            
            img:data[0].img,
            id:data[0].id
  
  
          })
        }
        
      )
   
    }
  }
}
