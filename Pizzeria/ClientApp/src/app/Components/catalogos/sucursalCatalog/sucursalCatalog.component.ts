import { Component, OnInit } from '@angular/core';
import { SucursalService } from 'src/app/Services/sucursalService/sucursal.service';
import { Sucursal } from 'src/app/Models/Sucursal';
import { MatDialog } from '@angular/material';
import { SucursalShowComponent } from '../sucursal-show/sucursal-show.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-sucursalcatalog',
  templateUrl: './sucursalCatalog.component.html',
  styleUrls: ['./sucursalCatalog.component.css']
})
export class SucursalCatalogComponent implements OnInit {
  public Sucursales: Sucursal[];
  constructor(public _sucursalService: SucursalService,
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

  public openDialogSucursal(): void {
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

  public toExportFileName(excelFileName: string): string {
    return `${excelFileName}_export_${new Date().getTime()}.xlsx`;
  }

  public exportAsExcelFile(json: Sucursal[], excelFileName: string): void {
    const SucursalsData: any[] = [];
    const data = Object.values(json);
      Object.keys(data).forEach((key, index) => {
        SucursalsData.push({
          '': '',
          'Nombre': data[key].nombre,
          'Telefono': data[key].telefono,
          'Direccion': (data[key].direccion.direccion + ', ' + data[key].direccion.colonia)
        });
      });

    const worksheetColumnsWidth = [
        {wch: 5},
        {wch: 20},
        {wch: 25},
        {wch: 40},
        {wch: 5},
    ];

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(SucursalsData, {});
    worksheet['!cols'] = worksheetColumnsWidth;

    const coords = {c: 5, r: 0};
    json.forEach(sucursal => {
      const PizzasData: any[] = [];
      sucursal.pizzas.forEach(pizza => {
        PizzasData.push({['Pizzas en ' + sucursal.nombre]: (pizza.nombre + ', $' + pizza.costo)});
      });
      XLSX.utils.sheet_add_json(worksheet, PizzasData, {origin: coords});
      worksheet['!cols'].push({wch: 35});
      coords.c ++;
    });

    const workbook: XLSX.WorkBook = {Sheets: {'Sucursales Info': worksheet}, SheetNames: ['Sucursales Info']};
    XLSX.writeFile(workbook, this.toExportFileName(excelFileName));
  }


  public exportToExcel() {
    this._sucursalService.GetSucursalesWithPizzas().subscribe(
      result => {
        this.exportAsExcelFile(result, 'Sucursals');
      }, error => {
        console.error(error);
      }
    );
  }
}
