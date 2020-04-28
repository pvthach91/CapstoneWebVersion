import { Component, OnInit } from '@angular/core';
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

  shoppingCart: Array<OrderItem>;
  totalPrice: number;
  totalItem: number;

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
    this.router.navigate(['/home']);
  }

  updateCart() {
    this.shoppingCart = this.cartStorage.getShoppingCart();
    this.totalPrice = 0;
    this.totalItem = 0;
    this.shoppingCart.forEach((cartItem, index) => {
      let rowPrice = cartItem.quantity*cartItem.product.price;
      this.totalPrice += rowPrice;
      this.totalItem ++;
    });
  }

}
