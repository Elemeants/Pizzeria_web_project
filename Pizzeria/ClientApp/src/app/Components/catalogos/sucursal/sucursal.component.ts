import { SucursalService } from 'src/app/Services/sucursalService/sucursal.service';
import { Component, OnInit } from '@angular/core';
import { Sucursal } from 'src/app/Models/Sucursal';
import { Router, NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PizzaService } from 'src/app/Services/pizzaService/pizza.service';

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css']
})
export class SucursalComponent implements OnInit {
  private sucursal: Sucursal;
  constructor(private _sucursalService: SucursalService,
    private _pizzaService: PizzaService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) {
      router.events.forEach((event) => {
        if (event instanceof NavigationEnd) {
          this.route.params.subscribe(
            params => {
              this.getSucursal(params['nombre']);
            });
        }
      });
    }

  ngOnInit() {
  }

  private getSucursal(nombreSucursal: string) {
    this._sucursalService.GetSucursalByName(nombreSucursal).subscribe(
      result => {
        this.sucursal = result;
        this.sucursal.pizzas = this._pizzaService.updateUrlImage(this.sucursal.pizzas);
      },
      error => console.error(error)
    );
  }
}
