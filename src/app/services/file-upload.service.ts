import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {configuration} from "../model/configuration.model";
import {Observable} from "rxjs";
import {ApiResponse} from "../model/api-response.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private configuration = configuration;

  constructor(private http: HttpClient) { }

  uploadFarmPhoto(files: File[]): Observable<string[]> {
    const url = configuration.host + '/api/upload/uploadFarm';

    const formdata = new FormData();
    for(let i =0; i < files.length; i++){
      formdata.append("files", files[i], files[i]['name']);
    }
    return this.http.post<string[]>(url, formdata);
  }

  uploadProducts(files: File[]): Observable<string[]> {
    const url = configuration.host + '/api/upload/uploadProduct';

    const formdata = new FormData();
    for(let i =0; i < files.length; i++){
      formdata.append("files", files[i], files[i]['name']);
    }
    return this.http.post<string[]>(url, formdata);
  }

  uploadProfilePhoto(file: File): Observable<ApiResponse> {
    const url = configuration.host + '/api/upload/uploadProfile';

    const formdata = new FormData();
    formdata.append("file", file, file['name']);
    return this.http.post<ApiResponse>(url, formdata);
  }

  uploadVehiclePhoto(file: File): Observable<ApiResponse> {
    const url = configuration.host + '/api/upload/uploadVehicle';

    const formdata = new FormData();
    formdata.append("file", file, file['name']);
    return this.http.post<ApiResponse>(url, formdata);
  }
}
