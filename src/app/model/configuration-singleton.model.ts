import {State} from "./state.model";
import {ShippingConfig} from "./shipping-config.model";
import {Address} from "./address.model";
import {User} from "./user.model";

export class ConfigurationSingleton {
  states: Array<State>;
  shippingConfigs: Array<ShippingConfig>;
  deliveryAddresses: Array<Address>;
  user: User;
}
