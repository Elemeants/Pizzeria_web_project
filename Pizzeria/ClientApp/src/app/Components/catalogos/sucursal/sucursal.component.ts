import { Pizza } from './../../../Models/Pizza';
import { SucursalService } from 'src/app/Services/sucursalService/sucursal.service';
import { Component, OnInit } from '@angular/core';
import { Sucursal } from 'src/app/Models/Sucursal';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PizzaService } from 'src/app/Services/pizzaService/pizza.service';
import { PizzaSucursalService } from 'src/app/Services/pizzaSucursal/pizzaSucursal.service';
import { SucursalDeleteDialogComponent } from './sucursalDeleteDialog/sucursalDeleteDialog.component';
import { MatDialog } from '@angular/material';
import { SucursalShowComponent } from '../sucursal-show/sucursal-show.component';

@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css']
})
export class SucursalComponent implements OnInit {
  private sucursal: Sucursal;
  private statusPizza: number;
  private Pizzas: Pizza[];
  private PizzasNotSucursal: Pizza[];
  constructor(private _sucursalService: SucursalService,
    private _pizzaSucursalService: PizzaSucursalService,
    private _pizzaService: PizzaService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private location: Location,
    private router: Router) {
      router.events.forEach((event) => {
        this.PizzasNotSucursal = new Array<Pizza>();
        this.Pizzas = new Array<Pizza>();
        if (event instanceof NavigationEnd) {
          this.route.params.subscribe(
            params => {
              this.getSucursal(params['nombre']);
              this.getPizzas();
            });
        }
      });
    }

  ngOnInit() {
    this.getNotPizzasInSucursal();
  }

  public deleteSucursal() {
    const dialogRef = this.dialog.open(SucursalDeleteDialogComponent, {
      width: '200px',
      minHeight: '150px',
      maxHeight: '200px',
      data: {data: this.sucursal}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._sucursalService.DeleteSucursal(this.sucursal.id).subscribe(
          results => {
            console.log(results);
            this.router.navigate(['Home']);
          }, error => {
            console.error(error);
          }
        );
      }
    });
  }

  private editSucursalDialog(): void {
    const dialogRef = this.dialog.open(SucursalShowComponent, {
      width: '300px',
      height: '500px',
      data: {sucursal: this.sucursal}
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.sucursal = result;
          this.router.navigate(['Sucursal', result.nombre]);
        }
      }
    );
  }

  private deletePizzaFromSucursal(pizza: Pizza) {
    this._pizzaSucursalService.deletePizzaFromSucursal(pizza, this.sucursal)
    .subscribe(
      result => {
        this.PizzasNotSucursal.push(pizza);
        this._pizzaSucursalService.GetPizzasFromSucursal(this.sucursal)
        .subscribe(
          resultPizza => {
            this._pizzaService.updateUrlImage(resultPizza);
            this.sucursal.pizzas = resultPizza;
          },
          errorPizza => {
            console.error(errorPizza);
          }
        );
        console.log(result);
      },
      error => {
        console.log(error);
      }
    );
  }

  private AddPizzatoSucursal(pizza: Pizza) {
    this._pizzaSucursalService.AddPizzaToSucursal(pizza, this.sucursal).subscribe(
      result => {
        this.sucursal.pizzas.push(pizza);
        this.getNotPizzasInSucursal();
        console.log(result);
      },
      error => {
        console.error(error);
      }
    );
  }

  private getNotPizzasInSucursal() {
    this.PizzasNotSucursal = new Array<Pizza>();
    this.Pizzas.forEach(
      (item) => {
        if (this.sucursal.pizzas.findIndex(x => x.id === item.id) === -1) {
          this.PizzasNotSucursal.push(item);
        }
      });
  }

  private getPizzas() {
    this._pizzaService.GetPizzasWithIngredientes()
      .subscribe(
      result => {
        if (result) {
          this._pizzaService.updateUrlImage(result);
          this.Pizzas = result;
          this.getNotPizzasInSucursal();
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

  private getSucursal(nombreSucursal: string) {
    this._sucursalService.GetSucursalByName(nombreSucursal).subscribe(
      result => {
        if (result) {
          this.sucursal = result;
          console.log(this.sucursal);
          if (this.sucursal.pizzas) {
            this.sucursal.pizzas = this._pizzaService.updateUrlImage(this.sucursal.pizzas);
          } else {
            this.sucursal.pizzas = new Array<Pizza>();
          }
        } else {
          this.sucursal = new Sucursal();
        }
      },
      error => console.error(error)
    );
  }
}
