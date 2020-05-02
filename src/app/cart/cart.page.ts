import {Component, OnInit, ViewChild} from '@angular/core';
import {CartStorageService} from "../services/cart-storage.service";
import {OrderItem} from "../model/order-item.model";
import {configuration} from "../model/configuration.model";
import {ActivatedRoute, Router} from "@angular/router";
import {HeaderPage} from "../header/header.page";
import {ConfigurationStorage} from "../services/configuration-storage.service";
import {Address} from "../model/address.model";
import {ShippingConfig} from "../model/shipping-config.model";
import {ShippingMethod} from "../model/shipping-method.model";

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
  shippingFee = 50;

  form: any = {};
  addresses: Array<Address> = new Array<Address>();
  shippingMethods: Array<ShippingMethod> = new Array<ShippingMethod>();

  constructor(private cartStorage: CartStorageService,
              private router: Router,
              private configurationStorage: ConfigurationStorage,
              private route: ActivatedRoute,) { }

  ngOnInit() {
    this.route.params.subscribe(
        params => {
          this.updateCart();
          this.addresses = this.configurationStorage.getDeliveryAddresses();
          this.form.deliverAddress = this.addresses[0];

          this.shippingMethods = this.cartStorage.getAvailableShippingMethod();
          this.updateAddress();

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

  checkout() {
    this.router.navigateByUrl('/checkout');
  }

  changeDeliverAddress(address: any) {
    this.updateAddress();
  }

  updateAddress() {
    this.form.state = this.form.deliverAddress.state;
    this.form.address = this.form.deliverAddress.address;
  }

  changeShippingMethod(method: any) {
    console.log(JSON.stringify(this.form.shippingMethod));
    this.shippingFee = this.form.shippingMethod.cost;
  }

}
