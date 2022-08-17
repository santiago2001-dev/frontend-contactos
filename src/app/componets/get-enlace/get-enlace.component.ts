import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { Router, RouterOutlet } from '@angular/router';
import {EnlacesService} from 'src/app/services/enlaces.service'
import {enlaces} from 'src/app/models/enlaces'
@Component({
  selector: 'app-get-enlace',
  templateUrl: './get-enlace.component.html',
  styleUrls: ['./get-enlace.component.css']
})
export class GetEnlaceComponent implements OnInit {
listenlaces : enlaces[] = []
  constructor(
    private linkserverice : EnlacesService,
    private fb: FormBuilder,
    private router :Router,
  ) { }

  ngOnInit(): void {
    this.getENlcaces()
  }


getENlcaces(){
  this.linkserverice.getAlink().subscribe(
    data=>{
      this.listenlaces = data;
    },
    (error)=>{
    
      swal.fire({
        icon: 'error',
        title: 'Sin conexión a la base de datos ',
      
      })
    
      }
  )
}

deleteContact(id : any){
  const swalWithBootstrapButtons = swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
  swalWithBootstrapButtons.fire({
    title: '¿estás seguro?',
    text: "Una vez eiminado el contacto no podrá ser recuperado!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'si, deseo eliminarlo',
    cancelButtonText: 'No, cancelar!',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {

      this.linkserverice.delelink(id).subscribe(
        data=>{
        swalWithBootstrapButtons.fire(
        'enlace eliminado!',
        'el enlace ha sido eliminado correctamente',
        'success'
      )
      this.router.navigate(['/admin/enlaces']); //redirección
      this.getENlcaces()

    },error=>{
      swal.fire({
        icon: 'error',
        title: 'algo salio mal intenta de nuevo ',
      
      })


    }
    )
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelado',
        'operación cancelada',
        'error'
      )
    }
  })

}




  closesecion(){
    localStorage.removeItem('token')
    this.router.navigate(['inicio'])
  }
}
