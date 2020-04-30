import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {configuration} from "../model/configuration.model";
import {ApiResponse} from "../model/api-response.model";
import {Address} from "../model/address.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private configuration = configuration;

  constructor(private http: HttpClient) { }

  getAddresses(userId : number): Observable<Array<Address>> {
    const url = configuration.host + '/api/guest/addresses/' + userId;
    return this.http.get<Array<Address>>(url, httpOptions);
  }

  getAddressesForCurrentUser(): Observable<Array<Address>> {
    const url = configuration.host + '/api/guest/addresses';
    return this.http.get<Array<Address>>(url, httpOptions);
  }

  getFarm(farmId: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/guest/address/' + farmId;
    return this.http.get<ApiResponse>(url);
  }

  deleteFarm(farmId: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/farmer/deleteAddress/{id}' + farmId;
    return this.http.post<ApiResponse>(url, null, httpOptions);
  }

  addAddress(address: Address): Observable<ApiResponse> {
    const url = configuration.host + '/api/farmer/addAddress';
    return this.http.post<ApiResponse>(url, address, httpOptions);
  }

}
