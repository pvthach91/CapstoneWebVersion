import {Component, OnInit, ViewChild} from '@angular/core';
import {CartStorageService} from "../services/cart-storage.service";
import {OrderItem} from "../model/order-item.model";
import {configuration} from "../model/configuration.model";
import {ActivatedRoute} from "@angular/router";
import {HeaderPage} from "../header/header.page";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  @ViewChild('headerPage',null) headerPage:HeaderPage;

  configuration = configuration;
  shoppingCart: Array<OrderItem>;
  totalPrice: number;

  constructor(private cartStorage: CartStorageService,
              private route: ActivatedRoute,) { }

  ngOnInit() {
    this.route.params.subscribe(
        params => {
          this.updateCart();
        });
  }

  updateCart() {
    this.shoppingCart = this.cartStorage.getShoppingCart();
    this.totalPrice = 0;
    this.shoppingCart.forEach((cartItem, index) => {
      let rowPrice = cartItem.quantity*cartItem.product.promotionPrice;
      this.totalPrice += rowPrice;
    });
    this.updateShoppingCartHeader();
  }

  increaseQuantity(cartItem: OrderItem): void {
    this.cartStorage.addItem(cartItem.product, 1);
    this.updateCart();
  }

  decreaseQuantity(cartItem: OrderItem): void {
    console.log(cartItem.quantity);
    if (cartItem.quantity > 1) {
      this.cartStorage.addItem(cartItem.product, - 1);
      this.updateCart();
    }
  }

  removeItem(dishId: number): void {
    this.cartStorage.removeItem(dishId);
    this.updateCart();
  }

  updateShoppingCartHeader() {
    this.headerPage.updateCart();
  }

}
