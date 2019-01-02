import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { endpoints } from '../../endpoints';
import { Direccion } from 'src/app/Models/Direccion';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  private baseUrl = endpoints.urlApi + 'Direcciones/';
  constructor(private _http: HttpClient) { }

  public addDireccion(direccion: Direccion) {
    return this._http.post(this.baseUrl, direccion, this.httpOptions).pipe();
  }
}
