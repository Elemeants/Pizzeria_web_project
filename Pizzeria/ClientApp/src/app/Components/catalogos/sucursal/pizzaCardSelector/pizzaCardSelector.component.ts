import { Pizza } from './../../../../Models/Pizza';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pizzacardselector',
  templateUrl: './pizzaCardSelector.component.html',
  styleUrls: ['./pizzaCardSelector.component.css']
})
export class PizzaCardSelectorComponent implements OnInit {
  @Input() public pizzaData: Pizza;
  @Output() public AddPizza = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

}
