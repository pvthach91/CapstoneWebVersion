import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../services/admin.service";
import {TokenStorageService} from "../../auth/token-storage.service";
import {User} from "../../model/user.model";
import {ActivatedRoute} from "@angular/router";
import {configuration} from "../../model/configuration.model";
import {FileUploadService} from "../../services/file-upload.service";
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: User = new User();
  profilePhoto:string = 'asset/images/no-photo.jpg';

  uploadActive = false;

  selectedFile: File;

  constructor(private adminService: AdminService,
              private route: ActivatedRoute,
              private fileUploadService: FileUploadService,
              public alertController: AlertController,
              private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (!this.tokenStorage.isLoggedIn()) {
      window.location.href = 'home';
      return;
    }
    this.route.params.subscribe(
        params => {
          this.getCurrentUser();
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

  getCurrentUser() {
    this.adminService.getCurrentUser().subscribe(
        data => {
          this.user = data;
          if (data.photo != undefined && data.photo != null) {
            this.profilePhoto = configuration.host + "/api/guest/file/" +data.photo;
          }
        },
        error => {
        }
    );
  }

  onFileChanged(event: any): void {
    let files = event.target.files;
    if (files != null) {
      this.selectedFile = files[0];
    } else {
      this.selectedFile = null;
    }
  }

  updatePhoto(user: User) {
    this.adminService.changePhoto(user).subscribe(
        data => {
          this.user = data;
          if (data.photo != undefined && data.photo != null) {
            this.profilePhoto = configuration.host + "/api/guest/file/" +data.photo;
          }
          this.uploadActive = false;
        },
        error => {
          console.log(error);
          this.presentAlert('Failed', '', 'Failed to register');
        }
    );
  }

  uploadPhoto() {
    if (this.selectedFile != null) {
      console.log(this.selectedFile);
      this.fileUploadService.uploadProfilePhoto(this.selectedFile).subscribe(
          data => {
            if (data.success) {
              let user = this.user;
              user.photo = data.data;
              this.updatePhoto(user);
            }
          },
          error => {
            this.presentAlert('Failed', '', 'Failed to upload photo');
          }
      );
    } else {
      this.presentAlert('Warning', '', 'Please select photo');
    }

  }

  openUploadSection() {
    this.uploadActive = true;
  }
  cancelUpload() {
    this.uploadActive = false;
    this.selectedFile = null;
  }

}
