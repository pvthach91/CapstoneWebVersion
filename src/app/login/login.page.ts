import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {TokenStorageService} from "../auth/token-storage.service";
import {AuthLoginInfo} from "../auth/login-info";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: any = {};
  private loginInfo: AuthLoginInfo;

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorage.isLoggedIn()) {
      let defaultPage = this.tokenStorage.getDefaultPage();
      window.location.href = defaultPage;
    }
  }

  onSubmit() {
    // this.spinnerService.show();
    // console.log(this.form);

    this.loginInfo = new AuthLoginInfo(
        this.form.username,
        this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
        data => {
          // this.spinnerService.hide();
          if (data.success == true) {
            this.tokenStorage.saveToken(data.data.accessToken);
            this.tokenStorage.saveUsername(data.data.username);
            this.tokenStorage.saveFullName(data.data.fullName);
            this.tokenStorage.saveAuthorities(data.data.authorities);
            this.reloadPage();
          } else {
            // this.toastr.error(data.message, 'Login failed');
          }
        },
        error => {
          // this.spinnerService.hide();
          // this.toastr.error('Please check your username and password', 'Login failed');
        }
    );
  }
  reloadPage() {
    let defaultPage = this.tokenStorage.getDefaultPage();
    window.location.href = defaultPage;
  }

}
