import {User} from "./user.model";

export class Comment {
  id: number;
  content: string;
  dateCreated: string;
  commentedBy: User;


  constructor(id: number, content: string, dateCreated: string, commentedBy: User) {
    this.id = id;
    this.content = content;
    this.dateCreated = dateCreated;
    this.commentedBy = commentedBy;
  }
}
