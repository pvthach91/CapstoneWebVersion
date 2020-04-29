export class Farm {
  id: number;
  state: string;
  address: string;
  images: Array<string>;
  latitude: number;
  longitude: number;


  constructor(id: number, state: string, address: string, images: Array<string>, latitude: number, longitude: number) {
    this.id = id;
    this.state = state;
    this.address = address;
    this.images = images;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
