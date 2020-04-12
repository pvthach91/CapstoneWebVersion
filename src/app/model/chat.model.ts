import {User} from "./user.model";

export class Chat {
  id: number;
  content: string;
  dateCreated: string;
  fromUser: User;
  toUser: User;
  sourceVisible: boolean;
  destinationVisible: boolean;


  constructor(id: number, content: string, dateCreated: string, fromUser: User, toUser: User, sourceVisible: boolean, destinationVisible: boolean) {
    this.id = id;
    this.content = content;
    this.dateCreated = dateCreated;
    this.fromUser = fromUser;
    this.toUser = toUser;
    this.sourceVisible = sourceVisible;
    this.destinationVisible = destinationVisible;
  }
}
