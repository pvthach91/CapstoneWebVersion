export class Vehicle {
  id: number;
  name: string;
  photo: string;
  pricePerKm: number;
  weightCarry: number;


  constructor(id: number, name: string, photo: string, pricePerKm: number, weightCarry: number) {
    this.id = id;
    this.name = name;
    this.photo = photo;
    this.pricePerKm = pricePerKm;
    this.weightCarry = weightCarry;
  }
}
