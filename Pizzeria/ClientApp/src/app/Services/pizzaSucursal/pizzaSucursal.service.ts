import { Sucursal } from './../../Models/Sucursal';
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
  constructor(private _http: HttpClient, sucursal: Sucursal) {
    this.baseUrl += sucursal.id + '/';
  }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  public AddPizzaToSucursal(pizzaId: number) {
    return this._http.post(this.baseUrl + pizzaId, '', this.httpOptions);
  }

  public GetPizzasFromSucursal(): Observable<Pizza[]> {
    return this._http.get<Pizza[]>(this.baseUrl + 'Pizzas');
  }

  public SetDireccionSucursal(direccion: Direccion) {
    return this._http.put(this.baseUrl + 'Direccion/' + direccion.id,
    '', this.httpOptions).pipe();
  }
}
