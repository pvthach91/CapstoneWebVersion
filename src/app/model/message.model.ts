export class MessageChat {
  img: string;
  position: string;
  content: string;
  senderName: string;
  time: string;


  constructor(img: string, position: string, content: string, senderName: string, time: string) {
    this.img = img;
    this.position = position;
    this.content = content;
    this.senderName = senderName;
    this.time = time;
  }
}
