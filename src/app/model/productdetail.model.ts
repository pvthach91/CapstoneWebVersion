import {Product} from "./product.model";
import {Rate} from "./rate.model";

export class Productdetail {
  dto: Product;
  comments: Array<Comment>;
  rates: Array<Rate>;
  recommendations: Array<Product>;


  constructor(dto: Product, comments: Array<Comment>, rates: Array<Rate>, recommendations: Array<Product>) {
    this.dto = dto;
    this.comments = comments;
    this.rates = rates;
    this.recommendations = recommendations;
  }
}
