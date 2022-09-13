import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { Contacs } from '../../models/contacts';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

import swal from 'sweetalert2';
import { timer } from 'rxjs';
@Component({
  selector: 'app-vcard',
  templateUrl: './vcard.component.html',
  styleUrls: ['./vcard.component.css']
})
export class VcardComponent implements OnInit {
  nameUser: String |null;
  listContact: Contacs[] = []
  filename  : any

  title = 'vcard'
  elementType = NgxQrcodeElementTypes.URL
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH
  value :any
  constructor(
    private contactservice : ContactsService,
    private router : Router,
    private aRouter  : ActivatedRoute  
  ) {
    this.nameUser = this.aRouter.snapshot.paramMap.get('nameuser');
   }

  ngOnInit(): void {
    this.getContact()
  }

  generateQr(id : any){
    this.contactservice.vcard(id).subscribe(
      data=>{
      
     
     this.value = data.link
    //  const contador = timer(900);
    //  contador.subscribe((n =>{
    //   window.location.reload()                                 
  
    //  }))
    
 },error=>{
  console.log(error)
  swal.fire({
    icon: 'error',
    title: 'Sin conexión a la base de datos ',
  
  })

}
)



}

getContact(){
  if(this.nameUser !==null){
    this.contactservice.getContactByuser(this.nameUser).subscribe(
      data =>{
        this.listContact = data


      }
    )

  }else{
    swal.fire({
      icon: 'error',
      title: 'algo salio mal intenta de nuevo porfavor ',
    
    })
  }
}

vcard(id: any){

  this.contactservice.vcard(id).subscribe(
      data=>{
      
       this.filename = data.vcard
   
      this.downloadFile(this.filename)
  
    
   },error=>{
        console.log(error)
        swal.fire({
          icon: 'error',
          title: 'Sin conexión a la base de datos ',
        
        })
  
      }
    )
  
  }
  
  
  
   downloadFile(pdf : any) {
    const linkSource = `data:application/pdf;base64,${pdf}`;
    const downloadLink = document.createElement("a");
    const fileName = "vcard.vcf";
  
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

}
