import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { SucursalShowComponent } from './Components/catalogos/sucursal-show/sucursal-show.component';
import { SucursalComponent } from './Components/catalogos/sucursal/sucursal.component';
import { PizzaComponent } from './Components/catalogos/pizza/pizza.component';
import { PizzaDetailComponent } from './Components/catalogos/pizza-detail/pizza-detail.component';

const routes: Routes = [
  { path: 'Home', component: HomeComponent},
  { path: 'Sucursal/:nombre', component: SucursalComponent},
  { path: 'Pizzas', component: PizzaComponent},
  { path: 'Pizzas/:id/edit', component: PizzaDetailComponent},
  { path: 'Pizzas/:id', component: PizzaDetailComponent},
  { path: '**', redirectTo: 'Home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
