import { Sucursal } from './../../Models/Sucursal';
import { SucursalService } from './../../Services/sucursalService/sucursal.service';
import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css']
})
export class NavmenuComponent implements OnInit {
  private Sucursales: string[];
  private screenHeight: number;
  private screenWidth: number;
  constructor(private _sucursalService: SucursalService) {
    this.onResize();
    this.Sucursales = [];
  }

  ngOnInit() {
    this._sucursalService.GetSucursales().subscribe(
      result => this.setSucursales(result),
      error => console.error(error)
    );
  }

  private setSucursales(sucursales: Sucursal[]) {
    this.Sucursales = sucursales.map(x => x.nombre);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }
}
