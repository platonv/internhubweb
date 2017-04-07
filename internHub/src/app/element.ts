export class Element{
  public id: number;
  public name: string;
  public email: string;
  public created_at: string;
  public updated_at: string;
  
  constructor(
      name :string = "",
      email :string = "",
      created_at :string = "",
      updated_at:string = ""){
        this.name = name;
        this.email = email;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}