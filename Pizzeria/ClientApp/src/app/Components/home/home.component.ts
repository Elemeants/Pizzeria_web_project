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
  private statusPizza: number;
  constructor(private _pizzaService: PizzaService,
    private _sucursalService: SucursalService) { }

  ngOnInit() {
    this.getPizzas();
    this._sucursalService.GetSucursales().subscribe(result => this.setSucursales(result), error => console.error(error));
  }

  private getPizzas() {
    this._pizzaService.GetPizzasWithIngredientes()
      .subscribe(
      result => {
        if (result) {
          this.setPizzas(result);
          this.statusPizza = 1;
        } else {
          this.statusPizza = 2;
        }
      },
      error => {
        console.error(error);
        this.statusPizza = 0;
      });
  }

  private setPizzas(pizzas: Pizza[]) {
    this._pizzaService.updateUrlImage(pizzas);
    this.Pizzas = pizzas;
  }

  private setSucursales(sucursales: Sucursal[]) {
    this.Sucursales = sucursales;
  }

}
