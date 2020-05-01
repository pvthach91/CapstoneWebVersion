import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {TokenStorageService} from "../auth/token-storage.service";
import {AuthLoginInfo} from "../auth/login-info";
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";
import {ConfigurationStorage} from "../services/configuration-storage.service";
import {ConfigurationSingletonService} from "../services/configuration-singleton.service";

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
              private configurationSingletonService: ConfigurationSingletonService,
              private configurationStorage: ConfigurationStorage,
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
            this.storeConfiguration();
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
    this.route.navigate([defaultPage]);
  }

  storeConfiguration() {
    this.configurationSingletonService.getConfigurations().subscribe(
        data => {
          if (data != null) {
            this.configurationStorage.saveConfiguration(data);
          } else {
            this.presentAlert('Failed', '', 'Failed to get configuration');
          }
        },
        error => {
          this.presentAlert('Failed', '', 'Failed to get configuration');
        }
    );
  }

}
