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
      }
      );
  }

  private setPizzas(pizzas: Pizza[]) {
    this._pizzaService.updateUrlImage(pizzas);
    this.Pizzas = pizzas;
  }

  private AddPizza() {
    // Reading the data from the form
    this.formWait = true;
    this.newPizza.nombre = this.newPizzaForm.value['nombre'];
    this.newPizza.costo = this.newPizzaForm.value['costo'];
    // Log's the object pizza
    // console.log(this.newPizza);
    // Process to add a pizza && upload the file
    this._pizzaService.AddPizza(this.newPizza).subscribe(
      result => {
        this.newPizza.id = result.id;
        this._pizzaService.AddIngredientesToPizza(this.newPizza);
        this._imageService.uploadImage('Pizzas', this.selectedFile)
        .subscribe(x => {
            // Reset's form data to null
            alert('Pizza agregada');
            this.resetForm();
          },
          y => {
            this.formWait = false;
            alert('Error al subir la imagen');
            this._pizzaService.DeletePizza(this.newPizza.id);
          });
      },
      error => {
        console.error(error);
        this.formWait = false;
        alert('Hubo un error al agregar la pizza');
      }
    );
  }

  public trackItem(index: number, item: Pizza) {
    return item.id;
  }

  private resetForm() {
    this.newPizzaForm.reset();
    this.newPizza = new Pizza();
    this.selectedFile = null;
    this.addNew = false;
    this.formWait = false;
    this.getPizzas();
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
