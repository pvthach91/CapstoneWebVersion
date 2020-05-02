import {Role} from './role.model';
import {Vehicle} from "./vehicle.model";

export class User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  state: string;
  address: string;
  joinDate: string;
  photo: string;
  latitude: number;
  longitude: number;
  isActive: boolean;
  roles: Array<Role>;
  vehicles: Array<Vehicle>;


  constructor() {
    this.id = 0;
    this.name = '';
    this.username = '';
    this.email = '';
    this.phone = '';
    this.state = '';
    this.address = '';
    this.joinDate = '';
    this.photo = '';
    this.latitude = 0;
    this.longitude = 0;
    this.isActive = false;
    this.roles = [];
  }
}
