export class Users{
    id : number;
    name :string;
    lastName : string;
    email :string;
    nameuser : string;
    cargo : string;
    area : string;
    number : string
    pryecto : string;
    img : string ;

constructor(id : number,name : string,lastName : string, email : string ,  nameuser : string, cargo : string ,area : string, number : string, proyecto : string ,img : string){
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.nameuser = nameuser;
    this.cargo = cargo ;
    this.area =  area;
    this.number =  number
    this.pryecto = proyecto;
    this.img = img; 


}

}