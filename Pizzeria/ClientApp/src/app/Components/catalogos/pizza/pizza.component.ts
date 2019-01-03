import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Pizza } from 'src/app/Models/Pizza';
import { PizzaService } from 'src/app/Services/pizzaService/pizza.service';
import { DialogPizzaComponent } from './dialogPizza/dialogPizza.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageService } from 'src/app/Services/imageService/image.service';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css']
})
export class PizzaComponent implements OnInit {
  constructor(private _pizzaService: PizzaService,
    private _imageService: ImageService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder) { this.newPizza = new Pizza(); }
  private addNew: boolean;
  private formWait: boolean;
  private statusPizza: number;
  private Pizzas: Pizza[];
  private newPizza: Pizza;
  private newPizzaForm: FormGroup;
  public selectedFile: File;

  ngOnInit() {
    this.formWait = false;
    this.newPizzaForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      costo: ['',  Validators.required],
    }, {});
    this.getPizzas();
  }
  get Form() {
    return this.newPizzaForm.controls;
  }

  private DeletePizza(pizza: Pizza) {
    this._pizzaService.DeletePizza(pizza.id).subscribe(
      result => {
        this._imageService.deleteImage('Pizzas',
        pizza.image.split('/Pizzas/')[1])
        .subscribe(
          resultdeleted => {
            alert('Se ha eliminado esa pizza!');
            this.getPizzas();
            pizza = new Pizza();
          },
          errordeleted => {
            console.error(errordeleted);
          }
        );
      },
      error => {
        console.error(error);
        alert('Upss hubo un fallo al eliminar la pizza');
      }
    );
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

  resetForm() {
    console.log('resetForm');
    this.addNew = false;
  }

  private setPizzas(pizzas: Pizza[]) {
    this._pizzaService.updateUrlImage(pizzas);
    this.Pizzas = pizzas;
  }
}
