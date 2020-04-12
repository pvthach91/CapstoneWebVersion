
export class ChatRequest {
  content: string;
  toUser: number;


  constructor(content: string, toUser: number) {
    this.content = content;
    this.toUser = toUser;
  }
}
