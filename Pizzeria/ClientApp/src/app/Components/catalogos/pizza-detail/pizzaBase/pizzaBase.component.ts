import { PizzaDeleteDialogComponent } from './pizzaDeleteDialog/pizzaDeleteDialog.component';
import { PizzaService } from './../../../../Services/pizzaService/pizza.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pizza } from 'src/app/Models/Pizza';
import { MatDialog } from '@angular/material';
import { ImageService } from 'src/app/Services/imageService/image.service';
@Component({
  selector: 'app-pizzabase',
  templateUrl: './pizzaBase.component.html',
  styleUrls: ['./pizzaBase.component.css']
})
export class PizzaBaseComponent implements OnInit {
  @Input() pizzaData: Pizza;
  @Input() isCard: boolean;
  @Input() delete_enabled: boolean;
  @Output() public pizzaDeleted = new EventEmitter<void>();
  constructor(private _pizzaService: PizzaService,
    private _imageService: ImageService,
    public dialog: MatDialog) {
    this.pizzaData = new Pizza();
   }

  ngOnInit() {  }

  private DeletePizza() {
    this._pizzaService.DeletePizza(this.pizzaData.id).subscribe(
      result => {
        this._imageService.deleteImage('Pizzas',
        this.pizzaData.image.split('/Pizzas/')[1])
        .subscribe(
          resultdeleted => {
            alert('Se ha eliminado esa pizza!');
            this.pizzaData = new Pizza();
            this.pizzaDeleted.next();
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

  private openDialogDelete(): void {
    const dialogRef = this.dialog.open(PizzaDeleteDialogComponent, {
      width: '200px',
      minHeight: '150px',
      maxHeight: '200px',
      data: {data: this.pizzaData}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.DeletePizza();
      }
    });
  }
}
