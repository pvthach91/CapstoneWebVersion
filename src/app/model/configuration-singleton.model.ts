import {State} from "./state.model";
import {ShippingConfig} from "./shipping-config.model";
import {Address} from "./address.model";

export class ConfigurationSingleton {
  states: Array<State>;
  shippingConfigs: Array<ShippingConfig>;
  deliveryAddresses: Array<Address>;
}
