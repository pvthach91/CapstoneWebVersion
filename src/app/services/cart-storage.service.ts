import { Injectable } from '@angular/core';
import {OrderItem} from "../model/order-item.model";
import {Product} from "../model/product.model";

const SHOPPING_CART_KEY = 'FoodProducerShoppingCart';

@Injectable({
  providedIn: 'root'
})
export class CartStorageService {

  constructor() { }

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

}
