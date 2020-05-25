import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Page} from "../model/page.model";
import {configuration} from "../model/configuration.model";
import {ApiResponse} from "../model/api-response.model";
import {Product} from "../model/product.model";
import {Farm} from "../model/farm.model";
import {Vehicle} from "../model/vehicle.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FarmerService {

  private configuration = configuration;

  constructor(private http: HttpClient) { }

  getFarms(userId : number): Observable<Array<Farm>> {
    const url = configuration.host + '/api/guest/farms/' + userId;
    return this.http.get<Array<Farm>>(url, httpOptions);
  }

  getFarmsForCurrentUser(): Observable<Array<Farm>> {
    const url = configuration.host + '/api/guest/farms';
    return this.http.get<Array<Farm>>(url, httpOptions);
  }

  getFarm(farmId: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/guest/farm/' + farmId;
    return this.http.get<ApiResponse>(url);
  }

  getVehicles(userId : number): Observable<Array<Farm>> {
    const url = configuration.host + '/api/guest/vehicles/' + userId;
    return this.http.get<Array<Farm>>(url, httpOptions);
  }

  getVehiclesForCurrentUser(): Observable<Array<Vehicle>> {
    const url = configuration.host + '/api/guest/vehicles';
    return this.http.get<Array<Vehicle>>(url, httpOptions);
  }

  getVehicle(vehicleId: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/guest/vehicle/' + vehicleId;
    return this.http.get<ApiResponse>(url);
  }

  deleteFarm(farmId: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/farmer/deleteFarm/' + farmId;
    return this.http.post<ApiResponse>(url, null, httpOptions);
  }

  deleteVehicle(vehicleId: number): Observable<ApiResponse> {
    const url = configuration.host + '/api/farmer/deleteVehicle/' + vehicleId;
    return this.http.post<ApiResponse>(url, null, httpOptions);
  }

  addFarm(farm: Farm): Observable<ApiResponse> {
    const url = configuration.host + '/api/farmer/addFarm';
    return this.http.post<ApiResponse>(url, farm, httpOptions);
  }

  changeFarmPhoto(farm: Farm): Observable<ApiResponse> {
    const url = configuration.host + '/api/farmer/changeFarmPhoto';
    return this.http.post<ApiResponse>(url, farm, httpOptions);
  }

  addVehicle(vehicle: Vehicle): Observable<number> {
    const url = configuration.host + '/api/farmer/addVehicle';
    return this.http.post<number>(url, vehicle, httpOptions);
  }

}
