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
  latitude: string;
  longitude: string;
  user: User;


  constructor(id: number, name: string, category: string, price: number, promotionPrice: number, promotionActive: boolean, description: string, images: Array<string>, dateCreated: string, latitude: string, longitude: string) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.price = price;
    this.promotionPrice = promotionPrice;
    this.promotionActive = promotionActive;
    this.description = description;
    this.images = images;
    this.dateCreated = dateCreated;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}