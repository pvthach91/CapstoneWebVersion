import {Role} from './role.model';

export class User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
  photo: string;
  latitude: number;
  longitude: number;
  isActive: boolean;
  roles: Array<Role>;
}
