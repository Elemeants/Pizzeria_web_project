import { Sucursal } from './../../Models/Sucursal';
import { SucursalService } from './../../Services/sucursalService/sucursal.service';
import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SucursalShowComponent } from '../catalogos/sucursal-show/sucursal-show.component';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css']
})
export class NavmenuComponent implements OnInit {
  private Sucursales: string[];
  private screenHeight: number;
  private screenWidth: number;
  constructor(private _sucursalService: SucursalService,
    public dialog: MatDialog) {
    this.onResize();
    this.Sucursales = [];
  }

  ngOnInit() { this.getSucursales(); }

  private getSucursales() {
    this._sucursalService.GetSucursales().subscribe(
      result => {
        this.Sucursales = result.map(x => x.nombre);
        console.log(this.Sucursales);
      },
      error => console.error(error)
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }

  private openDialogSucursal(): void {
    const dialogRef = this.dialog.open(SucursalShowComponent, {
      width: '300px',
      height: '500px'
    });
    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.getSucursales();
        }
      }
    );
  }
}
