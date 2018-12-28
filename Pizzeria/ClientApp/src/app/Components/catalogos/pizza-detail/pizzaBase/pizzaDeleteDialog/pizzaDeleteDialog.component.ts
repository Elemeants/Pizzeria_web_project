import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Pizza } from 'src/app/Models/Pizza';

@Component({
  selector: 'app-pizzadeletedialog',
  templateUrl: './pizzaDeleteDialog.component.html',
  styleUrls: ['./pizzaDeleteDialog.component.css']
})
export class PizzaDeleteDialogComponent {
  private pizzaData: Pizza;
  constructor(
    public dialogRef: MatDialogRef<PizzaDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public inputData: any) {
      this.pizzaData = inputData['data'];
    }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  private getResponse(): boolean {
    return true;
  }
}
