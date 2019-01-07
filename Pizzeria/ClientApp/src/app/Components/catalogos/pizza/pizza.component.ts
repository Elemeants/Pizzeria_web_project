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
  constructor(public _pizzaService: PizzaService,
    public _imageService: ImageService,
    public dialog: MatDialog,
    public formBuilder: FormBuilder) { this.newPizza = new Pizza(); }
  public addNew: boolean;
  public formWait: boolean;
  public statusPizza: number;
  public Pizzas: Pizza[];
  public newPizza: Pizza;
  public newPizzaForm: FormGroup;
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

  public DeletePizza(pizza: Pizza) {
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

  public getPizzas() {
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

  public setPizzas(pizzas: Pizza[]) {
    this._pizzaService.updateUrlImage(pizzas);
    this.Pizzas = pizzas;
  }
}
