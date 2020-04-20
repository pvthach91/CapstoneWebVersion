import {OrderItemRequest} from "./order-item-request.model";

export class OrderRequest {
  address: string;
  latitude: number;
  longitude: number;
  totalPrice: number;
  shippingMethod: string;
  shippingPrice: number;
  items: Array<OrderItemRequest>;


  constructor(address: string, latitude: number, longitude: number, totalPrice: number, shippingMethod: string, shippingPrice: number, items: Array<OrderItemRequest>) {
    this.address = address;
    this.latitude = latitude;
    this.longitude = longitude;
    this.totalPrice = totalPrice;
    this.shippingMethod = shippingMethod;
    this.shippingPrice = shippingPrice;
    this.items = items;
  }
}
