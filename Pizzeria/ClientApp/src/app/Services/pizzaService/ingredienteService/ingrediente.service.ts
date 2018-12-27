import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ingrediente } from 'src/app/Models/Ingrediente';
import { endpoints } from '../../endpoints';

@Injectable({
  providedIn: 'root'
})
export class IngredienteService {
  private baseUrl: string = endpoints.urlApi + 'Ingredientes/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  constructor(private _http: HttpClient) { }
  public GetIngredientes(): Observable<Ingrediente[]> {
    return this._http.get<Ingrediente[]>(this.baseUrl).pipe();
  }
}
