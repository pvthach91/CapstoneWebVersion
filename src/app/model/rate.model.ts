import {User} from "./user.model";

export class Rate {
  id: number;
  star: number;
  dateCreated: string;
  ratedBy: User;


  constructor(id: number, star: number, dateCreated: string, ratedBy: User) {
    this.id = id;
    this.star = star;
    this.dateCreated = dateCreated;
    this.ratedBy = ratedBy;
  }
}
