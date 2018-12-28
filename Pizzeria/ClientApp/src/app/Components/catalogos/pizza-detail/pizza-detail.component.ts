import { Component, OnInit } from '@angular/core';
import { Pizza } from 'src/app/Models/Pizza';
import { PizzaService } from 'src/app/Services/pizzaService/pizza.service';
import { Router, NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Sucursal } from 'src/app/Models/Sucursal';
import { endpoints } from 'src/app/Services/endpoints';

@Component({
  selector: 'app-pizza-detail',
  templateUrl: './pizza-detail.component.html',
  styleUrls: ['./pizza-detail.component.css']
})
export class PizzaDetailComponent implements OnInit {
  private image: string;
  private pizza: Pizza;
  private sucursales: Sucursal[];
  constructor(private _pizzaService: PizzaService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) {
      router.events.forEach((event) => {
        if (event instanceof NavigationEnd) {
          this.route.params.subscribe(
            params => {
              this.getPizza(params['id']);
            });
        }
      });
    }

  ngOnInit() {
  }

  private getPizza(pizzaId: number) {
    this._pizzaService.GetPizza(pizzaId).subscribe(
      result => {
        this.pizza = result;
        this.pizza = this._pizzaService.updateUrlImage(this.pizza);
        this.image = this.pizza.image;
      },
      error => console.error(error)
    );
    this._pizzaService.GetSucursalesFromPizza(pizzaId).subscribe(
      result => {
        this.sucursales = result;
      },
      error => console.error(error)
    );
  }
}
