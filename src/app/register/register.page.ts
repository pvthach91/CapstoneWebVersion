import { Component, OnInit } from '@angular/core';
import {AlertController} from "@ionic/angular";
import {SignUpInfo} from "../auth/signup-info";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form: any = {};
  signupInfo: SignUpInfo;
  passwordMatched :boolean = false;

  role = 2;

  constructor(private authService: AuthService,
              private route: Router,
              public alertController: AlertController) { }

  ngOnInit() {
  }

  chooseFarmer() {
    this.role = 2;
  }

  chooseBuyer() {
    this.role = 3;
  }

  farmerActive(): boolean {
    return this.role == 2;
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
        this.role,
        this.form.password,);
    this.authService.signUp(this.signupInfo).subscribe(
        data => {
          if (data.success) {
            this.presentAlert('Success', '', "Registered successfully, please login");
            this.route.navigate(['/login']);
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
