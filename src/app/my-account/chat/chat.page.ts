import { Component, OnInit } from '@angular/core';
import {AlertController, LoadingController} from "@ionic/angular";
import {ContactChat} from "../../model/contact-chat.model";
import {ChatService} from "../../services/chat.service";
import {ActivatedRoute} from "@angular/router";
import {configuration} from 'src/app/model/configuration.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  contactChats:Array<ContactChat> = new Array<ContactChat>();

  configuration = configuration;

  constructor(public loadingController: LoadingController,
              private chatService: ChatService,
              private route: ActivatedRoute,
              public alertController: AlertController) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getContacts();
    });
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

}
