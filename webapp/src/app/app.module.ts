import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
//rutas
import {routing,appRoutingProviders  } from "./app.routing";
//componentes
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { ErrorComponent } from './error/error.component'; 
import { ProductosComponent } from './productos/productos.component';
import { ContactoComponent } from './contacto/contacto.component';
import { CarritoComponent } from './carrito/carrito.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LibroComponent } from './libro/libro.component';
import { ListadoComponent } from './listado/listado.component';
import { FormsModule }   from '@angular/forms';
import { BusquedaComponent } from './busqueda/busqueda.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ErrorComponent,
    ProductosComponent,
    ContactoComponent,
    CarritoComponent,
    CheckoutComponent,
    LibroComponent,
    ListadoComponent,
    BusquedaComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
