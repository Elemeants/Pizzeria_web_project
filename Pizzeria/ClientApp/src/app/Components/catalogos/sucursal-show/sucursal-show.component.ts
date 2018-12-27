import { Component, OnInit } from '@angular/core';
import { SucursalService } from 'src/app/Services/sucursalService/sucursal.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sucursal-show',
  templateUrl: './sucursal-show.component.html',
  styleUrls: ['./sucursal-show.component.css']
})
export class SucursalShowComponent implements OnInit {
  ngOnInit() {
  }

  constructor(private _sucursalService: SucursalService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router) {
  }

  private getSucursal(sucursalName: string) {}
}
