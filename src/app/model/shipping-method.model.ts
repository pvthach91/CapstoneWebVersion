export class ShippingMethod {
  method: string;
  cost: number;


  constructor(method: string, cost: number) {
    this.method = method;
    this.cost = cost;
  }
}
