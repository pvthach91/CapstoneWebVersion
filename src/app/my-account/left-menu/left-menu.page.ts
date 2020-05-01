import {Component, Input, OnInit} from '@angular/core';
import {TokenStorageService} from "../../auth/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.page.html',
  styleUrls: ['./left-menu.page.scss'],
})
export class LeftMenuPage implements OnInit {
  @Input() currentPage: string;

  constructor(private tokenStorage: TokenStorageService,
              private route: Router) { }

  ngOnInit() {
  }

  isProfilePage(): boolean {
    return 'profile' == this.currentPage ? true : false;
  }

  isMyStorePage(): boolean {
    return 'my-store' == this.currentPage ? true : false;
  }

  isDeliverAddressPage(): boolean {
    return 'deliver-address' == this.currentPage ? true : false;
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

  isShippingConfigPage(): boolean {
    return 'shipping-config' == this.currentPage ? true : false;
  }

  logout() {
    this.tokenStorage.signOut();
    this.route.navigate(['/home']);
  }

}
