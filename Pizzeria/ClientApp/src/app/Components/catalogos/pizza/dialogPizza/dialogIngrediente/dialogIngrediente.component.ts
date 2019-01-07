import { IngredienteService } from './../../../../../Services/pizzaService/ingredienteService/ingrediente.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Ingrediente } from 'src/app/Models/Ingrediente';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialogingrediente',
  templateUrl: './dialogIngrediente.component.html',
  styleUrls: ['./dialogIngrediente.component.css']
})
export class DialogIngredienteComponent implements OnInit {
  public ingrediente: Ingrediente;
  public ingredienteForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DialogIngredienteComponent>,
    @Inject(MAT_DIALOG_DATA) public inputData: any,
    private formBuilder: FormBuilder,
    private _ingredienteService: IngredienteService) {
      this.ingrediente = new Ingrediente();
      this.ingredienteForm = this.formBuilder.group({
        nombre: ['', Validators.required],
      }, {});
    }

  ngOnInit() {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  get Form() {
    return this.ingredienteForm.controls;
  }

  public AddIngrediente() {
    this.ingrediente.nombre = this.ingredienteForm.value['nombre'];
    this._ingredienteService.AddIgrediente(this.ingrediente).subscribe(
      result => {
        console.log(result);
        this.dialogRef.close();
      }, error => {
        console.error(error);
      }
    );
  }
}
