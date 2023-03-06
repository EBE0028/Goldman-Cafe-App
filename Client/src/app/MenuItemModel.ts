export class MenuItem {
    Cost : number;
    Image : string;
    ItemID : number;
    Name : string;
    Category : string;
    Description : string;

    constructor(obj:any){
        this.Cost = obj.Cost
        this.Image = obj.Image
        this.Name = obj.Name
        this.ItemID = obj.ItemID
        this.Category = obj.Category
        this.Description = obj.Description
    }
}
