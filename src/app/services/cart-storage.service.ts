import {Injectable} from '@angular/core';
import {OrderItem} from "../model/order-item.model";
import {Product} from "../model/product.model";
import {ShippingMethod} from "../model/shipping-method.model";
import {ConfigurationStorage} from "./configuration-storage.service";
import {ShippingConfig} from "../model/shipping-config.model";
import {Vehicle} from "../model/vehicle.model";
import {DistanceService} from "./distance.service";
import {User} from "../model/user.model";
import {configuration} from "../model/configuration.model";

const SHOPPING_CART_KEY = 'FoodProducerShoppingCart';

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

  getAvailableShippingMethod(state:string): Array<ShippingMethod> {
    let methods:Array<ShippingMethod> = Array<ShippingMethod>();
    let shipByBuyer = new ShippingMethod('Self Shipping', 0, 0, 0, 0);
    methods.push(shipByBuyer);

    let weight = 0;

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
      weight += item.quantity;
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
        let shipByFarmer = new ShippingMethod('Shipping by Farmer', availableVehicle.pricePerKm, 1, user.latitude, user.longitude);
        methods.push(shipByFarmer);
      }
    }

    console.log(methods);

    let shoppingConfigs: Array<ShippingConfig> =this.configurationStorage.getShippingConfigs();

    let configMap: Map<string, Array<ShippingConfig>> = new Map<string, Array<ShippingConfig>>();
    shoppingConfigs.forEach((item, index) => {
      if (configMap.has(item.state)) {
        configMap.get(item.state).push(item);
      } else {
        let list:Array<ShippingConfig> = new Array<ShippingConfig>();
        list.push(item);
        configMap.set(item.state, list);
      }
    });
    let currentStateConfigs:Array<ShippingConfig> = configMap.get(state);
    console.log('currentStateConfigs' + currentStateConfigs);
    if (currentStateConfigs.length >= 1) {
      console.log('config >=1');
      let keepLoop = true;
      let availableConfig:ShippingConfig = null;
      currentStateConfigs.forEach((config, index) => {
        console.log('from: ' + config.weightCarryFrom+ ', to: ' + config.weightCarryTo+ ', weight: ' + weight);
        if (keepLoop) {
          if (config.weightCarryFrom<= weight && config.weightCarryTo >= weight) {
            availableConfig = config;
            keepLoop = false;
          }
        }
      });

      if (availableConfig != null) {
        let shipByCompany = new ShippingMethod('Shipping by ' + configuration.appName, availableConfig.price, 2, 0, 0);
        methods.push(shipByCompany);
      }
    } else {
      console.log('config >=1');
      let other:Array<ShippingConfig> = configMap.get('Otherwise');
      if (other.length==0) {
        let shipByCompany = new ShippingMethod('Shipping by ' + configuration.appName, 50, 2, 0, 0);
        methods.push(shipByCompany);
      } else if (other.length==1) {
        let shipByCompany = new ShippingMethod('Shipping by ' + configuration.appName, other[0].price, 2, 0, 0);
        methods.push(shipByCompany);
      }
    }

    return methods;
  }
}
