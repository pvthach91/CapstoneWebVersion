import {User} from "./user.model";

export class Product {
  id: number;
  name: string;
  category: string;
  price: number;
  promotionPrice: number;
  promotionActive: boolean;
  description: string;
  images: Array<string>;
  dateCreated: string;
  latitude: number;
  longitude: number;
  quantity: number;
  storeLocation: boolean;
  locationRef: number;
  user: User;
  status: string;
  totalOrder: number;
  distance: number;


  constructor(id: number, name: string, category: string, price: number, promotionPrice: number, promotionActive: boolean, description: string, images: Array<string>, latitude: number, longitude: number, quantity: number, storeLocation: boolean, locationRef: number) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.price = price;
    this.promotionPrice = promotionPrice;
    this.promotionActive = promotionActive;
    this.description = description;
    this.images = images;
    this.latitude = latitude;
    this.longitude = longitude;
    this.quantity = quantity;
    this.storeLocation = storeLocation;
    this.locationRef = locationRef;
    this.totalOrder = 0;
    this.distance = null;
  }
}