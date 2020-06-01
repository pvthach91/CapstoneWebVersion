import {Component, Input, OnInit} from '@angular/core';
import {MessageChat} from "../../../model/message.model";

@Component({
  selector: 'chat-bubble',
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.scss'],
})
export class ChatBubbleComponent implements OnInit {
  @Input() msg:MessageChat;

  constructor() { }

  ngOnInit() {}

}
