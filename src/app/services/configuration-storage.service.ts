import {Injectable} from '@angular/core';
import {State} from "../model/state.model";
import {ShippingConfig} from "../model/shipping-config.model";
import {ConfigurationSingleton} from "../model/configuration-singleton.model";

const STATE_LIST_KEY = 'CapstoneStateList';

const SHIPPING_CONFIG_LIST_KEY = 'CapstoneShippingConfigList';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationStorage {

    public shippingConfigLatest = false;

  constructor() { }

    public saveConfiguration(config: ConfigurationSingleton) {
      this.saveStateList(config.states);
      this.saveShippingConfigs(config.shippingConfigs);
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

}
