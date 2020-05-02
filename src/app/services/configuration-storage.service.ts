import {Injectable} from '@angular/core';
import {State} from "../model/state.model";
import {ShippingConfig} from "../model/shipping-config.model";
import {ConfigurationSingleton} from "../model/configuration-singleton.model";
import {Address} from "../model/address.model";

const STATE_LIST_KEY = 'CapstoneStateList';

const SHIPPING_CONFIG_LIST_KEY = 'CapstoneShippingConfigList';

const DELIVERY_ADDRESS_LIST_KEY = 'CapstoneDeliveryAddressList';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationStorage {

    public shippingConfigLatest = false;

    public deliveryAddressLatest = false;

  constructor() { }

    public saveConfiguration(config: ConfigurationSingleton) {
      this.saveStateList(config.states);
      this.saveShippingConfigs(config.shippingConfigs);
      this.saveDeliveryAddresses(config.deliveryAddresses);
    }


  // States
  public saveStateList(states: Array<State>) {
    window.localStorage.removeItem(STATE_LIST_KEY);
    window.localStorage.setItem(STATE_LIST_KEY, JSON.stringify(states));
  }

  public getStateList(): Array<State> {
     let stateListJson = localStorage.getItem(STATE_LIST_KEY);
     if (stateListJson == undefined || stateListJson == null) {
       let items: Array<State> = new Array<State>();
       return items;
     } else {
       let stateList: Array<State> = JSON.parse(stateListJson);
       return stateList;
     }
  }

  public removeStateList(){
    window.localStorage.removeItem(STATE_LIST_KEY);
  }


  // Shipping Config
    public saveShippingConfigs(shippings: Array<ShippingConfig>) {
        window.localStorage.removeItem(SHIPPING_CONFIG_LIST_KEY);
        window.localStorage.setItem(SHIPPING_CONFIG_LIST_KEY, JSON.stringify(shippings));
        this.shippingConfigLatest = true;
    }

    public getShippingConfigs(): Array<ShippingConfig> {
        let json = localStorage.getItem(SHIPPING_CONFIG_LIST_KEY);
        if (json == undefined || json == null) {
            let items: Array<ShippingConfig> = new Array<ShippingConfig>();
            return items;
        } else {
            let result: Array<ShippingConfig> = JSON.parse(json);
            return result;
        }
    }

    public removeShippingConfigs(){
        window.localStorage.removeItem(SHIPPING_CONFIG_LIST_KEY);
    }


    // Delivery Address
    public saveDeliveryAddresses(addresses: Array<Address>) {
        window.localStorage.removeItem(DELIVERY_ADDRESS_LIST_KEY);
        window.localStorage.setItem(DELIVERY_ADDRESS_LIST_KEY, JSON.stringify(addresses));
        this.deliveryAddressLatest = true;
    }

    public getDeliveryAddresses(): Array<Address> {
        let json = localStorage.getItem(DELIVERY_ADDRESS_LIST_KEY);
        if (json == undefined || json == null) {
            let items: Array<Address> = new Array<Address>();
            return items;
        } else {
            let result: Array<Address> = JSON.parse(json);
            return result;
        }
    }

    public removeDeliveryAddresses(){
        window.localStorage.removeItem(DELIVERY_ADDRESS_LIST_KEY);
    }

}
