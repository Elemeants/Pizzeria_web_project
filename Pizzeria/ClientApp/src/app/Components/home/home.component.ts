import { Pizza } from './../../Models/Pizza';
import { Sucursal } from './../../Models/Sucursal';
import { SucursalService } from './../../Services/sucursalService/sucursal.service';
import { PizzaService } from './../../Services/pizzaService/pizza.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private Sucursales: Sucursal[];
  private Pizzas: Pizza[];
  constructor(private _pizzaService: PizzaService,
    private _sucursalService: SucursalService) { }

  ngOnInit() {
    this._pizzaService.GetPizzasWithIngredientes().subscribe(result => this.setPizzas(result), error => console.error(error));
    this._sucursalService.GetSucursales().subscribe(result => this.setSucursales(result), error => console.error(error));
  }

  private setPizzas(pizzas: Pizza[]) {
    this._pizzaService.updateUrlImage(pizzas);
    this.Pizzas = pizzas;
  }

  private setSucursales(sucursales: Sucursal[]) {
    this.Sucursales = sucursales;
  }

}
