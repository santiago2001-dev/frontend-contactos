import { Component, OnInit } from '@angular/core';
//services 
import {UsersService} from 'src/app/services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
//model 
import {Users} from 'src/app/models/users'
import {busqueda} from 'src/app/models/contacts'
 
import swal from 'sweetalert2';

@Component({
  selector: 'app-get-users',
  templateUrl: './get-users.component.html',
  styleUrls: ['./get-users.component.css']
})
export class GetUsersComponent implements OnInit {
listUsers:Users[] = []
search: FormGroup
  constructor(
  private usersService  : UsersService,
  private fb: FormBuilder,
  private router :Router,

  ) {
    this.search = fb.group({
      busqueda : ['',Validators.required]
      })
    
   }

  ngOnInit(): void {
    this.getUsers();
  }

getUsers(){
  const busqueda : busqueda = {
    busqueda :  this.search.get('busqueda')?.value
  }

this.usersService.getAllUsers().subscribe(
  (data)=>{
    this.listUsers = data;
  


  },
  (error)=>{
    
  swal.fire({
    icon: 'error',
    title: 'Sin conexión a la base de datos ',
  
  })

  }
)

if (this.search.valid) {
    
  this.usersService.searchUsers(busqueda).subscribe(
    (data) => {
     
      this.listUsers = data;
    },
    (error) => {
      
    
      
}
  );
}

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

      this.usersService.deleteUsers(id).subscribe(
        data=>{
        swalWithBootstrapButtons.fire(
        'contacto eliminado!',
        'el usuaario ha sido eliminado correctamente',
        'success'
      )
      this.router.navigate(['/admin/users']); //redirección
      this.getUsers()

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
