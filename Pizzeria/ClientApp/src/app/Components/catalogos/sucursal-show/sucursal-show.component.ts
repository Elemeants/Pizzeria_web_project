import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SucursalService } from 'src/app/Services/sucursalService/sucursal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sucursal } from 'src/app/Models/Sucursal';
import { DireccionService } from 'src/app/Services/sucursalService/direccionService/direccionService.service';
import { Direccion } from 'src/app/Models/Direccion';

@Component({
  selector: 'app-sucursal-show',
  templateUrl: './sucursal-show.component.html',
  styleUrls: ['./sucursal-show.component.css']
})
export class SucursalShowComponent {
  public SucursalEdit: Sucursal;
  public actionDialog: string;
  public sucursalForm: FormGroup;
  public direccionForm: FormGroup;

  get Form() {
    return this.sucursalForm.controls;
  }
  get FormDir() {
    return this.direccionForm.controls;
  }
  constructor(private _sucursalService: SucursalService,
    private _direccionService: DireccionService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<SucursalShowComponent>,
    @Inject(MAT_DIALOG_DATA) public inputData: any) {
      this.sucursalForm = this.formBuilder.group({
        nombre: ['', Validators.required],
        telefono: ['',  Validators.required],
      }, {});
      this.direccionForm = this.formBuilder.group({
        direccion: ['', Validators.required],
        colonia: ['',  Validators.required],
      }, {});
      try {
        if (inputData['sucursal']) {
          this.SucursalEdit = inputData['sucursal'];
          this.sucursalForm.setValue({
            nombre: this.SucursalEdit.nombre,
            telefono: this.SucursalEdit.telefono,
          });
          this.direccionForm.setValue({
            direccion: this.SucursalEdit.direccion.direccion,
            colonia: this.SucursalEdit.direccion.colonia,
          });
          this.actionDialog = 'ACEPTAR';
        }
      } catch (Exception) {
        this.actionDialog = 'AGREGAR';
      }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private returnModalData() {
    const sucursal: Sucursal = this.sucursalForm.value;
    sucursal.direccion = this.direccionForm.value;
    console.log(sucursal);
    if (!this.SucursalEdit) {
      this._sucursalService.AddSucursal(sucursal).subscribe(
        result => {
          console.log(result);
          this.dialogRef.close(sucursal.nombre);
        }, error => {
          console.error(error);
        }
      );
    } else {
      this.SucursalEdit.nombre = sucursal.nombre;
      this.SucursalEdit.telefono = sucursal.telefono;
      this.SucursalEdit.direccion.direccion = sucursal.direccion.direccion;
      this.SucursalEdit.direccion.colonia = sucursal.direccion.colonia;
      console.log(sucursal);
      this._sucursalService.UpdateSucursal(this.SucursalEdit, this.SucursalEdit.id).subscribe(
        result => {
          console.log(result);
          this.dialogRef.close(this.SucursalEdit);
        }, error => {
          console.error(error);
        }
      );
    }
  }
}
