export class Farm {
  id: number;
  address: string;
  images: Array<string>;
  latitude: number;
  longitude: number;


  constructor(id: number, address: string, images: Array<string>, latitude: number, longitude: number) {
    this.id = id;
    this.address = address;
    this.images = images;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
