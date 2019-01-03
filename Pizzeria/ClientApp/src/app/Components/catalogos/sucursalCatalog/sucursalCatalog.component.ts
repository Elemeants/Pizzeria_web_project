import { ExcelService } from './../../../Services/excelService/excel.service';
import { Component, OnInit } from '@angular/core';
import { SucursalService } from 'src/app/Services/sucursalService/sucursal.service';
import { Sucursal } from 'src/app/Models/Sucursal';
import { MatDialog } from '@angular/material';
import { SucursalShowComponent } from '../sucursal-show/sucursal-show.component';

@Component({
  selector: 'app-sucursalcatalog',
  templateUrl: './sucursalCatalog.component.html',
  styleUrls: ['./sucursalCatalog.component.css']
})
export class SucursalCatalogComponent implements OnInit {
  public Sucursales: Sucursal[];
  constructor(private _sucursalService: SucursalService,
    private _excelService: ExcelService,
    public dialog: MatDialog) {
    this.Sucursales = [];
  }

  ngOnInit() {
    this.getSucursales();
  }

  public getSucursales() {
    this._sucursalService.GetSucursales().subscribe(
      result => {
        this.Sucursales = result;
      }, error => {
        console.error(error);
      }
    );
  }

  private openDialogSucursal(): void {
    const dialogRef = this.dialog.open(SucursalShowComponent, {
      width: '300px',
      height: '500px'
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.Sucursales.push(result);
          this.getSucursales();
        }
      }
    );
  }

  public exportToExcel(event) {
    this._sucursalService.GetSucursalesWithPizzas().subscribe(
      result => {
        this._excelService.exportAsExcelFile(result, 'Sucursals');
      }, error => {
        console.error(error);
      }
    );
  }
}
