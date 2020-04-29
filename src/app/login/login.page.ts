import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {TokenStorageService} from "../auth/token-storage.service";
import {AuthLoginInfo} from "../auth/login-info";
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";
import {ConfigurationStorage} from "../services/configuration-storage.service";
import {StateService} from "../services/state.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: any = {};
  private loginInfo: AuthLoginInfo;

  constructor(private authService: AuthService,
              public alertController: AlertController,
              private route: Router,
              private configurationStorage: ConfigurationStorage,
              private stateService: StateService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.isLoggedIn()) {
      let defaultPage = this.tokenStorage.getDefaultPage();
      this.route.navigate(['/login']);
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

  onSubmit() {
    this.loginInfo = new AuthLoginInfo(
        this.form.username,
        this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
        data => {
          if (data.success == true) {
            this.tokenStorage.saveToken(data.data.accessToken);
            this.tokenStorage.saveUsername(data.data.username);
            this.tokenStorage.saveFullName(data.data.fullName);
            this.tokenStorage.saveAuthorities(data.data.authorities);
            this.storeStates();
            this.reloadPage();
          } else {
            this.presentAlert('Login failed', '', data.message);
          }
        },
        error => {
          this.presentAlert('Login failed', '', 'Please check your username and password');
        }
    );
  }
  reloadPage() {
    let defaultPage = this.tokenStorage.getDefaultPage();
    window.location.href = defaultPage;
    this.route.navigate([defaultPage]);
  }

  storeStates() {
    this.stateService.getStates().subscribe(
        data => {
          if (data != null) {
            this.configurationStorage.saveStateList(data);

            console.log(this.configurationStorage.getStateList());
          } else {
            this.presentAlert('Login failed', '', 'Failed to get states');
          }
        },
        error => {
          this.presentAlert('Login failed', '', 'Please check your username and password');
        }
    );
  }

}
