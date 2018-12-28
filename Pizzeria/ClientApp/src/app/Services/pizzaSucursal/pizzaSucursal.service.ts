import { Sucursal } from 'src/app/Models/Sucursal';
import { Pizza } from './../../Models/Pizza';
import { Injectable } from '@angular/core';
import { endpoints } from '../endpoints';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Direccion } from 'src/app/Models/Direccion';

@Injectable({
  providedIn: 'root'
})
export class PizzaSucursalService {
  private baseUrl = endpoints.urlApi + 'Sucursales/';
  constructor(private _http: HttpClient) { }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  public deletePizzaFromSucursal(pizza: Pizza, sucursal: Sucursal) {
    return this._http.delete(this.baseUrl + sucursal.id + '/' + pizza.id).pipe();
  }

  public AddPizzaToSucursal(pizza: Pizza, sucursal: Sucursal) {
    return this._http.post(this.baseUrl + sucursal.id + '/' + pizza.id, '').pipe();
  }

  public GetPizzasFromSucursal(sucursal: Sucursal): Observable<Pizza[]> {
    return this._http.get<Pizza[]>(this.baseUrl + sucursal.id + '/' + 'Pizzas').pipe();
  }
}
