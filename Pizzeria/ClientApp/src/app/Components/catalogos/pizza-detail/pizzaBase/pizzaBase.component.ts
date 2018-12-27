import { Component, OnInit, Input } from '@angular/core';
import { Pizza } from 'src/app/Models/Pizza';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pizzabase',
  templateUrl: './pizzaBase.component.html',
  styleUrls: ['./pizzaBase.component.css']
})
export class PizzaBaseComponent implements OnInit {
  @Input() pizzaData: Pizza;
  @Input() isCard: boolean;
  @Input() delete_enabled: boolean;
  constructor() {
    this.pizzaData = new Pizza();
   }

  ngOnInit() {
  }

}
