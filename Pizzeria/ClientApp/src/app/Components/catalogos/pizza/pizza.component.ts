import { Ingrediente } from './../../../Models/Ingrediente';
import { SucursalService } from 'src/app/Services/sucursalService/sucursal.service';
import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Pizza } from 'src/app/Models/Pizza';
import { PizzaService } from 'src/app/Services/pizzaService/pizza.service';
import { DialogPizzaComponent } from './dialogPizza/dialogPizza.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css']
})
export class PizzaComponent implements OnInit {
  constructor(private _pizzaService: PizzaService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder) { this.newPizza = new Pizza(); }
  private addNew: boolean;
  private formWait: boolean;
  private Pizzas: Pizza[];
  private newPizza: Pizza;
  newPizzaForm: FormGroup;
  selectedFile: File;

  ngOnInit() {
    this.formWait = false;
    this.newPizzaForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      costo: ['',  Validators.required],
    }, {});
    this._pizzaService.GetPizzasWithIngredientes()
      .subscribe(
      result => this.setPizzas(result),
      error => console.error(error)
      );
  }
  get Form() {
    return this.newPizzaForm.controls;
  }

  private setPizzas(pizzas: Pizza[]) {
    this._pizzaService.updateUrlImage(pizzas);
    this.Pizzas = pizzas;
  }

  private clearFile() {
    this.addNew = false;
    this.selectedFile = null;
  }

  private AddPizza() {
    this.formWait = true;
    this.newPizza.Nombre = this.newPizzaForm.value['nombre'];
    this.newPizza.Costo = this.newPizzaForm.value['costo'];
    console.log(this.newPizza);
    this.newPizza = null;
    this.selectedFile = null;
    this.addNew = false;
    this.formWait = false;
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    this.newPizza.image = this.selectedFile.name;
  }

  private openDialog(): void {
    const dialogRef = this.dialog.open(DialogPizzaComponent, {
      width: '250px',
      minHeight: '200px',
      maxHeight: '500px',
      data: {select: this.newPizza.ingredientes}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.newPizza.ingredientes = result;
    });
  }
}
