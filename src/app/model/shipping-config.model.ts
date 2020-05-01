export class ShippingConfig {
  id: number;
  state: string;
  price: number;
  weightCarryFrom: number;
  weightCarryTo: number;


  constructor(id: number, state: string, price: number, weightCarryFrom: number, weightCarryTo: number) {
    this.id = id;
    this.state = state;
    this.price = price;
    this.weightCarryFrom = weightCarryFrom;
    this.weightCarryTo = weightCarryTo;
  }
}
