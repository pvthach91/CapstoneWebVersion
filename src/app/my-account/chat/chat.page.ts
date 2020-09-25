import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlertController, LoadingController} from "@ionic/angular";
import {ContactChat} from "../../model/contact-chat.model";
import {ChatService} from "../../services/chat.service";
import {ActivatedRoute, Router} from "@angular/router";
import {configuration} from 'src/app/model/configuration.model';
import {MessageChat} from "../../model/message.model";
import {Chat} from "../../model/chat.model";
import {ChatRequest} from "../../model/post/chat-request.model";
import {TokenStorageService} from "../../auth/token-storage.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit, OnDestroy {

  contactChats:Array<ContactChat> = new Array<ContactChat>();

  configuration = configuration;



  id;
  messages:Array<MessageChat> = new Array<MessageChat>();
  myMessage ='';

  chatInterval;

  constructor(public loadingController: LoadingController,
              private chatService: ChatService,
              private route: ActivatedRoute,
              private router: Router,
              private tokenStorage: TokenStorageService,
              public alertController: AlertController) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.getContacts();
      this.id = params['id'];
      if (this.id == null || this.id == undefined) {
        // Load new page
      } else {
        // Load detail page
        this.getChats();

        this.chatInterval = setInterval(() => {
          if (this.id != null) {
            this.getChats();
          }
        }, 5000);
      }
    });
  }

  ngOnDestroy(): void {
    console.log('leaving chat page');
    console.log('id: ' + this.id);
    this.id = null;
    if (this.chatInterval) {
      clearInterval(this.chatInterval);
    }
  }

  async presentAlert(header: string, subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  getContacts() {
    this.chatService.getChatContacts().subscribe(
        data => {
          if (data != null) {
            // this.users = data;
            this.contactChats = data;
          } else {
            this.presentAlert('Error', '', 'Failed to gt message');
          }
        },
        error => {
          console.log(error);
          this.presentAlert('Error', '', error.toString());
        }
    );
  }






  getChats() {
    let chatDetail = this;
    console.log('get chat with id: ' + this.id);
    this.chatService.getChats(this.id).subscribe(
        data => {
          if (data != null) {
            let chats = data;
            this.convertToMessage(chats);
            // this.content.scrollToBottom();
            // this.content.scrollToBottom(1500);
            // var objDiv = document.getElementById("main-content");
            // objDiv.scrollTop = objDiv.scrollHeight;
          } else {
            this.presentAlert('Error', '', 'Failed to gt message');
          }
        },
        error => {
          console.log(error);
          // this.presentAlert('Error', '', error.toString());
        }
    );
  }

  convertToMessage(chats: Array<Chat>) {
    this.messages = new Array<MessageChat>();
    chats.forEach((chat, index) => {
      let img = '';
      let position;
      let content = chat.content;
      let sender = chat.fromUser.name;
      let time = chat.dateCreated;
      if (chat.fromUser.username == this.tokenStorage.getUsername()) {
        if (chat.fromUser.photo == null || chat.fromUser.photo.length ==0){
          img = 'assets/images/no_image_available.png';
        } else {
          img = configuration.host + '/api/guest/file/' + chat.fromUser.photo;
        }
        position = 'right';
        sender = 'You';
      } else {
        if (chat.toUser.photo == null || chat.toUser.photo.length ==0){
          img = 'assets/images/no_image_available.png';
        } else {
          img = configuration.host + '/api/guest/file/' + chat.toUser.photo;
        }
        position = 'left';
      }
      let message = new MessageChat(img, position, content, sender, time);
      this.messages.push(message);
    });
  }

  addNewMessage() {
    let c: ChatRequest = new ChatRequest(this.myMessage, this.id);
    // let c = new Comment(null,'test', null, null);
    this.chatService.addChat(c).subscribe(
        data => {
          if (data != null) {
            this.myMessage = '';
            this.getChats();
            this.getContacts();
          } else {
            this.presentAlert('Error', '', 'Failed to gt message');
          }
        },
        error => {
          console.log(error);
          this.presentAlert('Error', '', JSON.stringify(error));
        }
    );
  }

  goToChatDetail(id) {
    this.router.navigateByUrl('/my-account/chat/detail/' + id);
    if (this.chatInterval) {
      clearInterval(this.chatInterval);
    }
  }

}
