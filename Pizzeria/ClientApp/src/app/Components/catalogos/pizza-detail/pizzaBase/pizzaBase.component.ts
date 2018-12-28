import { PizzaDeleteDialogComponent } from './pizzaDeleteDialog/pizzaDeleteDialog.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pizza } from 'src/app/Models/Pizza';
import { MatDialog } from '@angular/material';
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
  constructor(public dialog: MatDialog) {
    this.pizzaData = new Pizza();
   }

  ngOnInit() {  }

  private openDialogDelete(): void {
    const dialogRef = this.dialog.open(PizzaDeleteDialogComponent, {
      width: '200px',
      minHeight: '150px',
      maxHeight: '200px',
      data: {data: this.pizzaData}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pizzaDeleted.next();
      }
    });
  }
}
