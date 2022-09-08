import { Component, OnInit } from '@angular/core';
import {ContactsService} from 'src/app/services/contacts.service'
import swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';
@Component({
  selector: 'app-scanvcard',
  templateUrl: './scanvcard.component.html',
  styleUrls: ['./scanvcard.component.css']
})
export class ScanvcardComponent implements OnInit {

Id : String | null;
filename  : any
  constructor(
    private contactService : ContactsService,
    private router : Router,
    
    private aRouter : ActivatedRoute
  ) { 
    this.Id = this.aRouter.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.downloadvcard();
  }

downloadvcard(){
  this.contactService.vcard(this.Id).subscribe(
    data=>{
       
     this.filename = data.vcard

     this.downloadFile(this.filename)
     const contador = timer(200);
     contador.subscribe((n =>{
      this.router.navigate(['/home'])                                
  
     }))
    },
    error=>{
      swal.fire({
       icon: 'error',
       title: 'algo salio mal intenta de nuevo porfavor ',
     
     })


   }
  )
}

downloadFile(file : any) {
  const linkSource = `data:application/pdf;base64,${file}`;
  const downloadLink = document.createElement("a");
  const fileName = "vcard.vcf";

  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
}

}
