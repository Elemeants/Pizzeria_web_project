import { DialogPizzaComponent } from './Components/catalogos/pizza/dialogPizza/dialogPizza.component';
// Angular core imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// NGX-Responsive module
import { ResponsiveModule } from 'ngx-responsive';

// Components materialize
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';

// Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavmenuComponent } from './Components/navmenu/Navmenu.component';
import { HomeComponent } from './Components/home/home.component';
import { FooterPageComponent } from './Components/footer-page/footer-page.component';
import { SucursalShowComponent } from './Components/catalogos/sucursal-show/sucursal-show.component';
import { SucursalComponent } from './Components/catalogos/sucursal/sucursal.component';
import { PizzaComponent } from './Components/catalogos/pizza/pizza.component';
import { PizzaDetailComponent } from './Components/catalogos/pizza-detail/pizza-detail.component';
import { LoadingComponent } from './Components/loading/loading.component';
import { PizzaBaseComponent } from './Components/catalogos/pizza-detail/pizzaBase/pizzaBase.component';

@NgModule({
  declarations: [
    AppComponent,
    NavmenuComponent,
    HomeComponent,
    FooterPageComponent,
    SucursalShowComponent,
    SucursalComponent,
    PizzaComponent,
    PizzaDetailComponent,
    LoadingComponent,
    PizzaBaseComponent,
    DialogPizzaComponent
  ],
  imports: [
    MatCheckboxModule,
    MatDialogModule,
    MatSelectModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    ResponsiveModule.forRoot(),
    MatInputModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatMenuModule,
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    NgbModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogPizzaComponent]
})
export class AppModule { }
