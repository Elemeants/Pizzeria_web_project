import { Sucursal } from 'src/app/Models/Sucursal';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sucursalcard',
  templateUrl: './sucursalCard.component.html',
  styleUrls: ['./sucursalCard.component.css']
})
export class SucursalCardComponent implements OnInit {
  @Input() sucursal: Sucursal;
  constructor() {
    this.sucursal = new Sucursal();
  }

  ngOnInit() {
  }

}
