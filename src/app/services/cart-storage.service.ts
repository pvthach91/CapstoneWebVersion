import { Injectable } from '@angular/core';
import {OrderItem} from "../model/order-item.model";
import {Product} from "../model/product.model";
import {ShippingMethod} from "../model/shipping-method.model";
import {ConfigurationStorage} from "./configuration-storage.service";
import {ShippingConfig} from "../model/shipping-config.model";
import {Vehicle} from "../model/vehicle.model";
import {DistanceService} from "./distance.service";
import {User} from "../model/user.model";
import {State} from "../model/state.model";

const SHOPPING_CART_KEY = 'FoodProducerShoppingCart';

const SHOPPING_CART_SHIPPING_METHOD_KEY = 'CapstoneShoppingCartShippingMethod';
const SHOPPING_CART_SHIPPING_FEE_KEY = 'CapstoneShoppingCartShippingFee';

@Injectable({
  providedIn: 'root'
})
export class CartStorageService {

  constructor(private configurationStorage: ConfigurationStorage,
              private distanceService: DistanceService) { }

  public saveShoppingCart(cartItems: Array<OrderItem>) {
    window.localStorage.removeItem(SHOPPING_CART_KEY);
    window.localStorage.setItem(SHOPPING_CART_KEY, JSON.stringify(cartItems));
  }

  public getShoppingCart(): Array<OrderItem> {
     let shoppingCartJson = localStorage.getItem(SHOPPING_CART_KEY);
     // console.log(shoppingCartJson);
     if (shoppingCartJson == undefined || shoppingCartJson == null) {
       let items: Array<OrderItem> = new Array<OrderItem>();
       return items;
     } else {
       let shoppingCart: Array<OrderItem> = JSON.parse(shoppingCartJson);
       return shoppingCart;
     }
  }

  public remove(){
    window.localStorage.removeItem(SHOPPING_CART_KEY);
  }


  public addItem(product: Product, quantity: number) : boolean {
    let result = false;
    let shoppingCart: Array<OrderItem> = this.getShoppingCart();

    if (shoppingCart.length == 0) {
      let cartItem = new OrderItem(product, quantity);
      let items: Array<OrderItem> = new Array<OrderItem>();
      items.push(cartItem);
      this.saveShoppingCart(items);
      result = true;
    } else {
      // console.log(shoppingCart);
      let exist = false;
      shoppingCart.forEach((cart, index) => {
        if (cart.product.id == product.id) {
          exist = true;
          cart.quantity += quantity;
        }
      });
      if (!exist) {
        let cartItem = new OrderItem(product, quantity);
        shoppingCart.push(cartItem);
      }

      this.saveShoppingCart(shoppingCart);
      result = true;
    }

    return result;
  }

  public removeItem(dishId: number) : void {
    let shoppingCart: Array<OrderItem> = this.getShoppingCart();
    let index = -1;
    for (let i = 0; i < shoppingCart.length; i++) {
      if (shoppingCart[i].product.id == dishId) {
        index = i;
      }
    }
    if (index >= 0) {
      shoppingCart.splice(index, 1);
      this.saveShoppingCart(shoppingCart);
    }
  }

  getAvailableShippingMethod(): Array<ShippingMethod> {
    let methods:Array<ShippingMethod> = Array<ShippingMethod>();
    let shipByBuyer = new ShippingMethod('Self Shipping', 0, 0, 0, 0);
    methods.push(shipByBuyer);


    let sc: Array<OrderItem> = this.getShoppingCart();

    let shoppingCartMap: Map<number, Array<OrderItem>> = new Map<number, Array<OrderItem>>();

    sc.forEach((item, index) => {
      if (shoppingCartMap.has(item.product.user.id)) {
        shoppingCartMap.get(item.product.user.id).push(item);
      } else {
        let list:Array<OrderItem> = new Array<OrderItem>();
        list.push(item);
        shoppingCartMap.set(item.product.user.id, list);
      }
    });

    // Only 1 producer so we need to get available vehicles
    if (shoppingCartMap.size == 1) {
      let vehicles: Array<Vehicle> = new Array<Vehicle>();
      let items: Array<OrderItem> = new Array<OrderItem>();
      let user: User;
      let totalWeight = 0;
      shoppingCartMap.forEach((itemValues, key) => {
        vehicles = itemValues[0].product.user.vehicles;
        items = itemValues;
        user = itemValues[0].product.user;
      });

      items.forEach((item, index) => {
        totalWeight += item.quantity;
      });

      let keepLoop = true;
      let availableVehicle:Vehicle = null;
      vehicles.forEach((vehicle, index) => {
        if (keepLoop) {
          if (vehicle.weightCarry>= totalWeight) {
            availableVehicle = vehicle;
            keepLoop = false;
          }
        }
      });

      if (availableVehicle != null) {
        // let distance = this.distanceService.distance(lat, lng, user.latitude, user.longitude);
        // let roundDistance = Math.ceil(distance/1000);
        // console.log('distance: ' + distance, "rounded: " + roundDistance);
        let shipByFarmer = new ShippingMethod('Shipping by Farmer', availableVehicle.pricePerKm, 1, user.latitude, user.longitude);
        methods.push(shipByFarmer);
      }
    }

    console.log(methods);

    let shoppingConfigs: Array<ShippingConfig> =this.configurationStorage.getShippingConfigs();


    return methods;
  }


  public saveShippingMethod(method: string) {
    window.localStorage.removeItem(SHOPPING_CART_SHIPPING_METHOD_KEY);
    window.localStorage.setItem(SHOPPING_CART_SHIPPING_METHOD_KEY, method);
  }

  public getShippingMethod(): string {
    let result = localStorage.getItem(SHOPPING_CART_SHIPPING_METHOD_KEY);
    return result;
  }

  public removeShippingMethod(){
    window.localStorage.removeItem(SHOPPING_CART_SHIPPING_METHOD_KEY);
  }

  public saveShippingFee(method: number) {
    window.localStorage.removeItem(SHOPPING_CART_SHIPPING_FEE_KEY);
    window.localStorage.setItem(SHOPPING_CART_SHIPPING_FEE_KEY, method.toString());
  }

  public getShippingFee(): string {
    let result = localStorage.getItem(SHOPPING_CART_SHIPPING_FEE_KEY);
    return result;
  }

  public removeShippingFee(){
    window.localStorage.removeItem(SHOPPING_CART_SHIPPING_FEE_KEY);
  }

}
