import { Sucursal } from './../../Models/Sucursal';
import { Injectable } from '@angular/core';
import { endpoints } from '../endpoints';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {
  private baseUrl = endpoints.urlApi + 'Sucursales/';
  constructor(private _http: HttpClient) { }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  public GetSucursales(): Observable<Sucursal[]> {
    return this._http.get<Sucursal[]>(this.baseUrl).pipe();
  }

  public GetSucursal(sucursalId: number): Observable<Sucursal> {
    return this._http.get<Sucursal>(this.baseUrl + sucursalId).pipe();
  }

  public AddSucursal(sucursal: Sucursal) {
    return this._http.post(this.baseUrl, sucursal, this.httpOptions).pipe();
  }

  public DeleteSucursal(sucursalId: number) {
    return this._http.delete(this.baseUrl + sucursalId).pipe();
  }

  public UpdateSucursal(sucursal: Sucursal, sucursalId: number) {
    return this._http.put(this.baseUrl + sucursalId, sucursal, this.httpOptions);
  }

  public GetSucursalByName(sucursalName: string): Observable<Sucursal> {
    return this._http.get<Sucursal>(this.baseUrl + 'Search/' + sucursalName).pipe();
  }
}
