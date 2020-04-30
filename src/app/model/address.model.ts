export class Address {
  id: number;
  state: string;
  address: string;
  latitude: number;
  longitude: number;


  constructor(id: number, state: string, address: string, latitude: number, longitude: number) {
    this.id = id;
    this.state = state;
    this.address = address;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
