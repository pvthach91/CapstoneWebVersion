import {Injectable} from '@angular/core';
import {State} from "../model/state.model";

const STATE_LIST_KEY = 'CapstoneStateList';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationStorage {

  constructor() { }


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

}
