import {User} from "./user.model";

export class ContactChat {
  lastUpdated: string;
  user: User;


  constructor(lastUpdated: string, user: User) {
    this.lastUpdated = lastUpdated;
    this.user = user;
  }
}
