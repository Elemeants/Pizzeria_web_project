import { ExcelService } from './../../../Services/excelService/excel.service';
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

  public toExportFileName(excelFileName: string): string {
    return `${excelFileName}_export_${new Date().getTime()}.xlsx`;
  }

  public exportAsExcelFile(json: Sucursal[], excelFileName: string): void {
    console.log(json);
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
    let PizzasData: any[] = [];
    const coords = {c: 5, r: 0};
    json.forEach(sucursal => {
      sucursal.pizzas.forEach(pizza => {
        XLSX.utils.sheet_add_json(worksheet, [pizza.nombre], {origin: coords});
        coords.r ++;
      });
      worksheet['!cols'].push({wch: 20});
      coords.c ++;
      coords.r = 0;
      PizzasData = new Array<any>();
    });

    console.log(worksheet);

    const workbook: XLSX.WorkBook = {Sheets: {'Sucursales Info': worksheet}, SheetNames: ['Sucursales Info']};
    XLSX.writeFile(workbook, this.toExportFileName(excelFileName));
  }


  public exportToExcel(event) {
    this._sucursalService.GetSucursalesWithPizzas().subscribe(
      result => {
        this.exportAsExcelFile(result, 'Sucursals');
      }, error => {
        console.error(error);
      }
    );
  }
}
