export class Users{
    id : number;
    name :string;
    lastname : string;
    email :string;
    password : string;
    role : string;
    img : string ;

constructor(id :number,name : string,lastname : string, email : string , password : string ,role : string ,img : string){
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.role = role ;
    this.img = img; 


}

}