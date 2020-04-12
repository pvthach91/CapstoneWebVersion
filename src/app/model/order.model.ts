import {OrderItem} from "./order-item.model";
import {User} from "./user.model";

export class Order {
  id: number;
  orderId: string;
  date: string;
  orderBy: User;
  address: string;
  latitude: number;
  longitude: number;
  totalPrice: number;
  status: string;
  items: Array<OrderItem>;


  constructor(id: number, orderId: string, date: string, orderBy: User, address: string, latitude: number, longitude: number, totalPrice: number, status: string, items: Array<OrderItem>) {
    this.id = id;
    this.orderId = orderId;
    this.date = date;
    this.orderBy = orderBy;
    this.address = address;
    this.latitude = latitude;
    this.longitude = longitude;
    this.totalPrice = totalPrice;
    this.status = status;
    this.items = items;
  }
}
