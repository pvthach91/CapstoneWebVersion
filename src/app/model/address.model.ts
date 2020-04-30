export class Address {
  id: number;
  name: string;
  state: string;
  address: string;
  latitude: number;
  longitude: number;


  constructor(id: number, name: string, state: string, address: string, latitude: number, longitude: number) {
    this.id = id;
    this.name = name;
    this.state = state;
    this.address = address;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
