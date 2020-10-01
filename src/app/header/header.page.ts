import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TokenStorageService} from "../auth/token-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderItem} from "../model/order-item.model";
import {CartStorageService} from "../services/cart-storage.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.page.html',
  styleUrls: ['./header.page.scss'],
})
export class HeaderPage implements OnInit {
  @Input() currentPage: string;

  @Output() searchEmit = new EventEmitter();

  shoppingCart: Array<OrderItem>;
  totalPrice: number;
  totalItem: number;

  form: any = {};

  constructor(private tokenStorage: TokenStorageService,
              private cartStorage: CartStorageService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
        params => {
          this.updateCart();
        });
  }

  logout() {
    this.tokenStorage.signOut();
    this.router.navigate(['/login']);
  }

  updateCart() {
    this.shoppingCart = this.cartStorage.getShoppingCart();
    this.totalPrice = 0;
    this.totalItem = 0;
    this.shoppingCart.forEach((cartItem, index) => {
      let rowPrice = cartItem.quantity*cartItem.product.promotionPrice;
      this.totalPrice += rowPrice;
      this.totalItem ++;
    });
  }

  search() {
    this.searchEmit.emit(this.form.productName);
  }

  isBuyerHomePage(): boolean {
    return 'buyer-home' == this.currentPage ? true : false;
  }

  isBuyerOrderPage(): boolean {
    return ('order' == this.currentPage && this.tokenStorage.hasBuyerRole()) ? true : false;
  }

  isBuyerAddressPage(): boolean {
    return 'buyer-address' == this.currentPage ? true : false;
  }

  isBuyerCheckoutPage(): boolean {
    return 'buyer-checkout' == this.currentPage ? true : false;
  }

  isFarmerHomePage(): boolean {
    return ('store' == this.currentPage && this.tokenStorage.hasFarmerRole()) ? true : false;
  }

  isFarmerFarmPage(): boolean {
    return 'farmer-farm' == this.currentPage ? true : false;
  }

  isFarmerVehiclePage(): boolean {
    return 'farmer-vehicle' == this.currentPage ? true : false;
  }

  isFarmerOrderPage(): boolean {
    return ('order' == this.currentPage && this.tokenStorage.hasFarmerRole()) ? true : false;
  }

  isAdminHomePage(): boolean {
    return 'user' == this.currentPage ? true : false;
  }

  isAdminProfilePage(): boolean {
    return ('profile' == this.currentPage && this.tokenStorage.hasAdminRole()) ? true : false;
  }

  isPMHomePage(): boolean {
    return ('order' == this.currentPage && this.tokenStorage.hasPMRole()) ? true : false;
  }

  isPMStorePage(): boolean {
    return ('store' == this.currentPage && this.tokenStorage.hasPMRole()) ? true : false;
  }

  isPMShippingPage(): boolean {
    return 'pm-shipping' == this.currentPage ? true : false;
  }

  isContactUsPage(): boolean {
    return 'contact-us' == this.currentPage ? true : false;
  }

  isBODPage(): boolean {
    return 'bod' == this.currentPage ? true : false;
  }

  isPrivacyPage(): boolean {
    return 'privacy' == this.currentPage ? true : false;
  }

}
