import { Component, OnInit } from '@angular/core';
import {configuration} from "../model/configuration.model";
import {OrderItem} from "../model/order-item.model";
import {Address} from "../model/address.model";
import {ShippingMethod} from "../model/shipping-method.model";
import {CartStorageService} from "../services/cart-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfigurationStorage} from "../services/configuration-storage.service";
import {DistanceService} from "../services/distance.service";
import {AlertController} from "@ionic/angular";
import {User} from "../model/user.model";
import {OrderRequest} from "../model/post/order-request.model";
import {OrderItemRequest} from "../model/post/order-item-request.model";
import {OrderService} from "../services/order.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  configuration = configuration;
  shoppingCart: Array<OrderItem>;
  totalPrice: number;
  shippingFee = 0;

  form: any = {};
  addresses: Array<Address> = new Array<Address>();
  shippingMethods: Array<ShippingMethod> = new Array<ShippingMethod>();

  currentDistance = 0;

  user:User = new User();
  canSubmit = false;

  constructor(private cartStorage: CartStorageService,
              private router: Router,
              private configurationStorage: ConfigurationStorage,
              private route: ActivatedRoute,
              private distanceService: DistanceService,
              private orderService: OrderService,
              public alertController: AlertController) { }

  ngOnInit() {
    this.route.params.subscribe(
        params => {
          this.updateCart();
          if (this.shoppingCart.length == 0) {
            this.presentAlert('Warning', '', 'Your cart is empty');
            this.canSubmit = false;
          } else {
            this.canSubmit = false;
            this.initInformation();
            this.addresses = this.configurationStorage.getDeliveryAddresses();
            this.form.deliverAddress = new Address(null,'', '', '', 0, 0);

            // this.shippingMethods = this.cartStorage.getAvailableShippingMethod();
            this.updateAddress();
          }
        });
  }

  initInformation() {
    this.user = this.configurationStorage.getCurrentUser();
    console.log(this.user);
    this.form.name = this.user.name;
    this.form.email = this.user.email;
    this.form.phone = this.user.phone;
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

  updateCart() {
    this.shoppingCart = this.cartStorage.getShoppingCart();
    this.totalPrice = 0;
    this.shoppingCart.forEach((cartItem, index) => {
      let rowPrice = cartItem.quantity*cartItem.product.promotionPrice;
      this.totalPrice += rowPrice;
    });
  }

  changeDeliverAddress(address: any) {
    this.updateAddress();
    this.shippingMethods = this.cartStorage.getAvailableShippingMethod(this.form.deliverAddress.state);
    this.form.shippingMethod = null;
    if (this.form.shippingMethod != null && this.form.shippingMethod.latitude != null) {
      let d = this.distanceService.distance(this.form.deliverAddress.latitude, this.form.deliverAddress.longitude, this.form.shippingMethod.latitude, this.form.shippingMethod.longitude);
      this.currentDistance = Math.ceil(d/1000);

      console.log('current distance: ' + this.currentDistance);
      this.calculateShippingFee();
    }
  }

  updateAddress() {
    this.form.state = this.form.deliverAddress.state;
    this.form.address = this.form.deliverAddress.address;
  }

  changeShippingMethod(method: any) {
    if (this.form.deliverAddress.latitude == null || this.form.deliverAddress.longitude == undefined) {
      this.presentAlert('Warning', '', 'Please select delivery address');
    } else {
      let d = this.distanceService.distance(this.form.deliverAddress.latitude, this.form.deliverAddress.longitude, this.form.shippingMethod.latitude, this.form.shippingMethod.longitude);
      this.currentDistance = Math.ceil(d/1000);
      this.calculateShippingFee();
    }
  }

  calculateShippingFee() {
    if (this.form.shippingMethod.type == 0) {
      this.shippingFee = 0;
    } else if (this.form.shippingMethod.type == 1) {
      this.shippingFee = this.currentDistance * this.form.shippingMethod.cost;
    } else if (this.form.shippingMethod.type == 2) {
      this.shippingFee = this.form.shippingMethod.cost;
    }
  }

  async onSubmit() {
    if (this.form.deliverAddress == null || this.form.deliverAddress.latitude == 0) {
      this.presentAlert('Warning', '', 'Please select deliver address');
      return;
    }

    if (this.form.shippingMethod == null || this.form.shippingMethod.latitude == null) {
      this.presentAlert('Warning', '', 'Please select shipping method');
      return;
    }


    let payment = this.form.paymentMethod;
    if (payment == null || payment == undefined) {
      this.presentAlert('Warning', '', 'Please select payment');
      return ;
    }
    let readTerm = this.form.readTerm;
    if (readTerm == null || readTerm == undefined || !readTerm) {
      this.presentAlert('Warning', '', 'Please read terms and condition');
      return ;
    }
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure to order?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          handler: () => {
            this.orderService.create(this.getOrderRequest()).subscribe(
                data => {
                  if (data.success) {
                    this.cartStorage.remove();
                    this.goToConfirmationPage(data.data);
                  } else {
                    this.presentAlert("Error", '', data.message);
                  }
                },
                error => {
                  this.presentAlert("Error", '', error);
                }
            );
          }
        }
      ]
    });

    await alert.present();
  }

  getOrderRequest(): OrderRequest {
    let address = this.form.deliverAddress.address;
    let lat = this.form.deliverAddress.latitude;
    let lng = this.form.deliverAddress.longitude;
    let shippingMethod = this.form.shippingMethod.method;

    let items: Array<OrderItemRequest> = new Array<OrderItemRequest>();
    this.shoppingCart.forEach((orderItem, index) => {
      let oir: OrderItemRequest = new OrderItemRequest(orderItem.product.id, orderItem.quantity);
      items.push(oir);
    });

    let orderRequest: OrderRequest = new OrderRequest(address, lat, lng, this.totalPrice, shippingMethod, this.shippingFee, items);

    return orderRequest;
  }

  goToConfirmationPage(id: number) {
    this.router.navigateByUrl('/confirmation/' + id);
  }

}
