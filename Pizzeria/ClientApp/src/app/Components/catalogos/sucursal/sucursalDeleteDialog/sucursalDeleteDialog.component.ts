import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Sucursal } from 'src/app/Models/Sucursal';

@Component({
  selector: 'app-sucursaldeletedialog',
  templateUrl: './sucursalDeleteDialog.component.html',
  styleUrls: ['./sucursalDeleteDialog.component.css']
})
export class SucursalDeleteDialogComponent {
  public sucursal: Sucursal;
  constructor(public dialogRef: MatDialogRef<SucursalDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public inputData: any) {
      this.sucursal = inputData['data'];
    }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  public getResponse(): boolean {
    return true;
  }
}
