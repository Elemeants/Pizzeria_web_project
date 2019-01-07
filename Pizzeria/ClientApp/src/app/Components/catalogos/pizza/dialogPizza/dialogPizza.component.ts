import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IngredienteService } from 'src/app/Services/pizzaService/ingredienteService/ingrediente.service';
import { Ingrediente } from 'src/app/Models/Ingrediente';
import { MatDialog } from '@angular/material';
import { DialogIngredienteComponent } from './dialogIngrediente/dialogIngrediente.component';

@Component({
  selector: 'app-dialogpizza',
  templateUrl: './dialogPizza.component.html',
  styleUrls: ['./dialogPizza.component.css']
})
export class DialogPizzaComponent {
  public dialogSelection: Ingrediente[];
  public status: boolean[];
  public originalSelection: [];
  constructor(
    public dialogRef: MatDialogRef<DialogPizzaComponent>,
    @Inject(MAT_DIALOG_DATA) public inputData: any,
    public dialog: MatDialog,
    public _ingredienteService: IngredienteService) {
      this.status = new Array<boolean>();
      this.dialogSelection = new Array<Ingrediente>();
      this._ingredienteService.GetIngredientes().subscribe(
        result => {
          this.dialogSelection = result;
          if (inputData['select']) {
            this.originalSelection = inputData['select'];
            this.buildCheckPoints(inputData['select']);
          }
        },
        error => console.error(error)
      );
    }

  public buildCheckPoints(inputIngredientes: Array<Ingrediente>) {
    this.dialogSelection.forEach((item, index) => {
      this.status[index] = (!!inputIngredientes.find(x => x.id === item.id));
    });
  }

  onNoClick(): void {
    this.dialogRef.close(this.originalSelection);
  }

  public openNewIngrediente(): void {
    const dialogRef = this.dialog.open(DialogIngredienteComponent, {
      width: '250px',
      height: '200px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this._ingredienteService.GetIngredientes().subscribe(
        items => this.dialogSelection = items,
        error => console.error(error)
      );
    });
  }

  public getData(): Array<Ingrediente> {
    const dataArray: Array<Ingrediente> = new Array<Ingrediente>();
    this.dialogSelection.forEach((item, index) => {
      dataArray.push(this.status[index] ? item : null);
    });
    return dataArray.filter(x => x);
  }
}
