import { Ingrediente } from './../../../../Models/Ingrediente';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pizza } from 'src/app/Models/Pizza';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogPizzaComponent } from '../dialogPizza/dialogPizza.component';
import { PizzaService } from 'src/app/Services/pizzaService/pizza.service';
import { ImageService } from 'src/app/Services/imageService/image.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-pizzaform',
  templateUrl: './pizzaForm.component.html',
  styleUrls: ['./pizzaForm.component.css']
})
export class PizzaFormComponent implements OnInit {
  public actionResult: string;
  @Input() pizza: Pizza;
  @Input() isNew: boolean;
  @Output() update = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
  private newPizza: Pizza;
  private newPizzaForm: FormGroup;
  public selectedFile: File;
  public formWait: boolean;
  constructor(private _pizzaService: PizzaService,
    private _imageService: ImageService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder) {
    this.newPizzaForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      costo: ['',  Validators.required],
    }, {});
    this.newPizza = new Pizza();
  }

  ngOnInit() {
    console.log(this.isNew);
    if (!this.pizza) {
      this.actionResult = 'AGREGAR';
    } else {
      this.actionResult = 'EDITAR';
      this.newPizzaForm.setValue({
        nombre: this.pizza.nombre,
        costo: this.pizza.costo
      });
      this.pizza = this._pizzaService.deconstructUrlImage(this.pizza);
      this.newPizza = this.pizza;
    }
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    this.newPizza.image = this.selectedFile.name;
  }

  get Form() {
    return this.newPizzaForm.controls;
  }

  public Submit() {
    // Reading the data from the form
    this.formWait = true;
    this.newPizza.nombre = this.newPizzaForm.value['nombre'];
    this.newPizza.costo = this.newPizzaForm.value['costo'];
    if (!this.pizza) {
      this.AddPizza();
      this.newPizza = new Pizza();
      this.newPizza.ingredientes = new Array<Ingrediente>();
    } else {
      this.UpdatePizza();
    }
  }

  public resetForm() {
    this.close.next();
  }

  private openDialog(): void {
    const dialogRef = this.dialog.open(DialogPizzaComponent, {
      width: '250px',
      minHeight: '200px',
      maxHeight: '500px',
      data: {select: this.newPizza.ingredientes }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.newPizza.ingredientes = result;
    });
  }

  private UpdatePizza() {
    // Log's the object pizza
    // console.log(this.newPizza);
    // Process to add a pizza && upload the file
    this.newPizza.id = this.pizza.id;
    const cachedPizza = this.newPizza;
    this._pizzaService.UpdatePizza(this.newPizza, this.pizza.id)
    .subscribe(
      result => {
        this.newPizza = cachedPizza;
        this._pizzaService.DeleteIngredientesFromPizza(this.pizza);
        this._pizzaService.AddIngredientesToPizza(this.newPizza);
        if (this.newPizza.image !== this.pizza.image) {
          this._imageService.deleteImage('Pizzas', this.pizza.image).subscribe(
            results => {}, errors => {}
          );
          this._imageService.uploadImage('Pizzas', this.selectedFile)
          .subscribe(x => {
              // Reset's form data to null
              alert('Pizza actualizada');
              this.formWait = false;
              this.newPizzaForm.reset();
              this.selectedFile = null;
              this.newPizza = new Pizza();
              this.update.next();
              this.close.next();
            },
            y => {
              this.formWait = false;
              alert('Error al subir la imagen');
              this._pizzaService.DeletePizza(this.newPizza.id);
            });
        } else {
          alert('Pizza actualizada');
          this.update.next();
        }
      },
      error => {
        console.error(error);
        this.formWait = false;
        alert('Hubo un error al agregar la pizza');
      }
    );
  }

  private AddPizza() {
    // Log's the object pizza
    // console.log(this.newPizza);
    // Process to add a pizza && upload the file
    const cachedPizza = this.newPizza;
    this._pizzaService.AddPizza(this.newPizza).subscribe(
      result => {
        cachedPizza.id = result.id;
        this._pizzaService.AddIngredientesToPizza(cachedPizza);
        this._imageService.uploadImage('Pizzas', this.selectedFile)
        .subscribe(x => {
            // Reset's form data to null
            alert('Pizza agregada');
            this.formWait = false;
            this.newPizzaForm.reset();
            this.selectedFile = null;
            this.newPizza = new Pizza();
            this.update.next();
            this.close.next();
          },
          y => {
            this.formWait = false;
            alert('Error al subir la imagen');
            this._pizzaService.DeletePizza(cachedPizza.id);
          });
      },
      error => {
        console.error(error);
        this.formWait = false;
        alert('Hubo un error al agregar la pizza');
      }
    );
  }
}
