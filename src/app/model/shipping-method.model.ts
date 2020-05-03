export class ShippingMethod {
  method: string;
  cost: number;
  type: number;
  latitude: number;
  longitude: number;


  constructor(method: string, cost: number, type: number, latitude: number, longitude: number) {
    this.method = method;
    this.cost = cost;
    this.type = type;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
