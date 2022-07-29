export class Contacs{
    id : number;
    name :string;
    lastname : string;
    email :string;
    nameuser : string;
    cargo : string;
    area : string;
    number : string
    proyecto : string;
    img : string ;

constructor(id : number,name : string,lastname : string, email : string ,  nameuser : string, cargo : string ,area : string, number : string, proyecto : string ,img : string){
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.nameuser = nameuser;
    this.cargo = cargo ;
    this.area =  area;
    this.number =  number
    this.proyecto = proyecto;
    this.img = img; 


}

}

export class busqueda{
    busqueda : string ;
    constructor(busqueda : string){
        this.busqueda = busqueda;

    }
}