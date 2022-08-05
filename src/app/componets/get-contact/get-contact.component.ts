import { Component, OnInit } from '@angular/core';
import {Contacs,busqueda} from 'src/app/models/contacts';
import {ContactsService} from 'src/app/services/contacts.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

 
import swal from 'sweetalert2';
import { ThisReceiver } from '@angular/compiler';
@Component({
  selector: 'app-get-contact',
  templateUrl: './get-contact.component.html',
  styleUrls: ['./get-contact.component.css']
})
export class GetContactComponent implements OnInit {
search: FormGroup
listContacts : Contacs[] = []
titulo = 'CREAR CONTACTO';
  constructor(
    private fb: FormBuilder,
    private router :Router,
    private ContacService : ContactsService
  ) { 
  this.search = fb.group({
  busqueda : ['',Validators.required]
  })


  }

  ngOnInit(): void {
    this.getContacts()
  }


  getContacts(){
    const busqueda : busqueda = {
        busqueda :  this.search.get('busqueda')?.value

    }
    this.ContacService.getAllContac().subscribe(
      (data)=>{
        this.listContacts = data;
        
      },
      (error)=>{
          
      swal.fire({
        icon: 'error',
        title: 'Sin conexión a la base de datos ',
      
      })
      }
    )
 
    if (this.search.valid) {
    
      this.ContacService.searchContact(busqueda).subscribe(
        (data) => {
          console.log(data);
          this.listContacts = data;
        },
        (error) => {
          
          swal.fire({
            icon: 'error',
            title: 'Sin conexión a la base de datos ',
          
          })
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

        this.ContacService.deleContact(id).subscribe(
          data=>{
          swalWithBootstrapButtons.fire(
          'contacto eliminado!',
          'el contacto ha sido eliminado correctamente',
          'success'
        )
        this.router.navigate(['/admin/contact']); //redirección
        this.getContacts()

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