import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  constructor() { }
  static toExportFileName(excelFileName: string): string {
    return `${excelFileName}_export_${new Date().getTime()}.xlsx`;
  }

  private formatExcelColumnAsNumber(worksheet: XLSX.WorkSheet, column: string) {
    const C = XLSX.utils.decode_col(column);
    const format = '$0.00';
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    for (let i = range.s.r + 1; i <= range.e.r; ++i) {
      /* find the data cell (range.s.r + 1 skips the header row of the worksheet) */
      const ref = XLSX.utils.encode_cell({r: i, c: C});
      console.log(worksheet[ref]);
      /* if the particular row did not contain data for the column, the cell will not be generated */
      if (!worksheet[ref]) { continue; }
      /* `.t == "n"` for number cells */
      if (worksheet[ref].t === 'n') { continue; }
      /* assign the `.z` number format */
      worksheet[ref].z = format;
    }
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    console.log(json);
    const newArray: any[] = [];
    const data = Object.values(json);
      Object.keys(data).forEach((key, index) => {
        newArray.push({
          '': '',
          'Nombre': data[key].nombre,
          'Telefono': data[key].telefono,
          'Direccion': (data[key].direccion.direccion + ', ' + data[key].direccion.colonia)
        });
      });

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(newArray);

    const C = XLSX.utils.decode_col('C');
    const format = '$0.00';
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    for (let i = range.s.r + 1; i <= range.e.r; ++i) {
      /* find the data cell (range.s.r + 1 skips the header row of the worksheet) */
      const ref = XLSX.utils.encode_cell({r: i, c: C});
      console.log(worksheet[ref]);
      /* if the particular row did not contain data for the column, the cell will not be generated */
      if (!worksheet[ref]) { continue; }
      /* `.t == "n"` for number cells */
      if (worksheet[ref].t === 'n') { continue; }
      /* assign the `.z` number format */
      worksheet[ref].z = format;
    }

    const workbook: XLSX.WorkBook = {Sheets: {'data': worksheet}, SheetNames: ['data']};
    XLSX.writeFile(workbook, ExcelService.toExportFileName(excelFileName));
  }
}
