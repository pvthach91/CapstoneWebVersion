import {Component, Input, OnInit} from '@angular/core';
import {TokenStorageService} from "../../auth/token-storage.service";

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.page.html',
  styleUrls: ['./left-menu.page.scss'],
})
export class LeftMenuPage implements OnInit {
  @Input() currentPage: string;

  constructor(private tokenStorage: TokenStorageService,) { }

  ngOnInit() {
  }

  isProfilePage(): boolean {
    return 'profile' == this.currentPage ? true : false;
  }

  isMyStorePage(): boolean {
    return 'my-store' == this.currentPage ? true : false;
  }

  isFarmPage(): boolean {
    return 'farm' == this.currentPage ? true : false;
  }

  isVehiclePage(): boolean {
    return 'vehicle' == this.currentPage ? true : false;
  }

  isOrderPage(): boolean {
    return 'order' == this.currentPage ? true : false;
  }

  isChatPage(): boolean {
    return 'chat' == this.currentPage ? true : false;
  }

  isUserPage(): boolean {
    return 'user' == this.currentPage ? true : false;
  }

  logout() {
    this.tokenStorage.signOut();
    this.route.navigate(['/home']);
  }

}
