import { Component, OnInit } from '@angular/core';
import {User} from "../../model/user.model";
import {UserSearchCriteria} from "../../model/user-search-criteria.model";
import {AdminService} from "../../services/admin.service";
import {TokenStorageService} from "../../auth/token-storage.service";
import {configuration} from "../../model/configuration.model";
import {AlertController} from "@ionic/angular";
import {SignUpInfo} from "../../auth/signup-info";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  showList: boolean = true;

  users:Array<User> = new Array<User>();
  criteria: UserSearchCriteria;
  currentPage: number = 1;
  totalPage: number;
  pages: Array<number> = new Array<number>();

  form: any = {};
  signupInfo: SignUpInfo;
  passwordMatched :boolean = false;

  constructor(private adminService: AdminService,
              private route: Router,
              private tokenStorage: TokenStorageService,
              public alertController: AlertController) { }

  ngOnInit() {
    if (!this.tokenStorage.hasAdminRole()) {
      this.route.navigate(['/home']);
    }
    this.search(1);
  }

  openCreatingUser(): void {
    this.showList = false;
  }

  openUserList(): void {
    this.showList = true;
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

  //User list

  search(page: number) {
    this.criteria = new UserSearchCriteria(
        null,
        null,
        null,
        1,
        page,
        configuration.pageSize
    );
    this.adminService.getUsers(this.criteria).subscribe(
        data => {
          this.users = data.data;
          this.currentPage = data.current;
          this.totalPage = data.total;
          this.makePages();
        },
        error => {
          console.log(error);
        }
    );
  }

  makePages() {
    this.pages = new Array<number>();
    if (this.totalPage < 1) {
      // do nothing
    } else {
      for (var i = 1; i <= this.totalPage; i++) {
        this.pages.push(i);
      }
    }
  }

  gotoPage(page: number) {
    if(page <1) {
      page = 1;
    }
    this.search(page);
  }


  async deactivate(username: string, index: number) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure to DEACTIVATE the user?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          handler: () => {
            // console.log('Confirm Okay');
            this.adminService.deactivateUser(username).subscribe(
                data => {
                  if (data.success) {
                    this.users[index] = data.data;
                  } else {
                    this.presentAlert('Failed', '', data.message);
                  }
                },
                error => {
                  this.presentAlert('Failed', '', 'Failed to deactivate the user');
                }
            );
          }
        }
      ]
    });

    await alert.present();
  }

  async activate(username: string, index: number) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure to ACTIVATE the user?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          handler: () => {
            this.adminService.activateUser(username).subscribe(
                data => {
                  if (data.success) {
                    this.users[index] = data.data;
                  } else {
                    this.presentAlert('Failed', '', data.message);
                  }
                },
                error => {
                  this.presentAlert('Failed', '', 'Failed to activate the user');
                }
            );
          }
        }
      ]
    });

    await alert.present();
  }


  //Creating user
  onSubmit() {
    let pass = this.form.password;
    let cpass = this.form.cpassword;
    if (pass != null && pass.length >= 3 && cpass != null && cpass.length >= 3 && pass == cpass) {
      this.passwordMatched = true;
    } else {
      this.passwordMatched = false;
      return;
    }
    this.signupInfo = new SignUpInfo(
        this.form.name,
        this.form.username,
        this.form.email,
        this.form.phone,
        1,
        this.form.password,);
    this.adminService.registerPM(this.signupInfo).subscribe(
        data => {
          if (data.success) {
            this.search(1);
            this.openUserList();
          } else {
            this.presentAlert('Failed', '', data.message);
          }

        },
        error => {
          console.log(error);
          this.presentAlert('Failed', '', 'Failed to register');
        }
    );
  }

}
