import {State} from "./state.model";
import {ShippingConfig} from "./shipping-config.model";

export class ConfigurationSingleton {
  states: Array<State>;
  shippingConfigs: Array<ShippingConfig>;
}
