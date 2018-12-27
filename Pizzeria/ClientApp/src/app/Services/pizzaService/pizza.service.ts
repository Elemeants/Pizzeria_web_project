import { Pizza } from 'src/app/Models/Pizza';
import { Injectable } from '@angular/core';
import { endpoints } from '../endpoints';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Sucursal } from 'src/app/Models/Sucursal';
import { Ingrediente } from 'src/app/Models/Ingrediente';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  private baseUrl = endpoints.urlApi + 'Pizzas/';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  constructor(private _http: HttpClient) { }

  public updateUrlImage(pizzas) {
    if (Array.isArray(pizzas)) {
      pizzas.forEach(x => x.image = (endpoints.urlImages + 'Pizzas/' + x.image));
    } else {
      pizzas.image = endpoints.urlImages + 'Pizzas/' + pizzas.image;
    }
    return pizzas;
  }
  public AddIngredientesToPizza(pizza: Pizza) {
    console.log('+++++++++++++++++++++++');
    console.log(pizza);
    console.log('+++++++++++++++++++++++');
    const urlIngrediente = this.baseUrl + pizza.id + '/';
    pizza.ingredientes.forEach(element => {
      this._http.post(urlIngrediente + element.id, '', this.httpOptions).pipe();
    });
  }
  public GetSucursalesFromPizza(pizzaId: number): Observable<Sucursal[]> {
    return this._http.get<Sucursal[]>(this.baseUrl + pizzaId + '/Sucursales').pipe();
  }
  public GetPizzas(): Observable<Pizza[]> {
    return this._http.get<Pizza[]>(this.baseUrl).pipe();
  }

  public GetPizza(pizzaId: number): Observable<Pizza> {
    return this._http.get<Pizza>(this.baseUrl + pizzaId).pipe();
  }

  public AddPizza(pizza: Pizza): Observable<Pizza> {
    return this._http.post<Pizza>(this.baseUrl, pizza, this.httpOptions).pipe();
  }

  public DeletePizza(pizzaId: number) {
    return this._http.delete(this.baseUrl + pizzaId).pipe();
  }

  public UpdatePizza(pizza: Pizza, pizzaId: number) {
    return this._http.put(this.baseUrl + pizzaId, pizza, this.httpOptions).pipe();
  }

  public GetPizzasWithIngredientes() {
    return this._http.get<Pizza[]>(this.baseUrl + 'Ingredientes').pipe();
  }
}