import { NgModule, ModuleWithProviders }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//componentes
import { ErrorComponent } from './error/error.component'; 
import { InicioComponent}  from './inicio/inicio.component';
import { ProductosComponent } from './productos/productos.component';
import { ContactoComponent } from './contacto/contacto.component';
import { CarritoComponent } from './carrito/carrito.component';
import { LibroComponent } from './libro/libro.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ListadoComponent } from './listado/listado.component';
import { FormularioComponent } from './formulario/formulario.component';
import { BusquedaComponent } from './busqueda/busqueda.component';


const appRoutes: Routes  = [ 
    {path: '', component: InicioComponent},
    {path: 'Inicio', component: InicioComponent},
    {path: 'Categorias', component: ProductosComponent},
    {path: 'Contacto', component: ContactoComponent},
    {path: 'Carrito', component: CarritoComponent},
    {path: 'Libro', component: LibroComponent},
    {path: 'Checkout', component: CheckoutComponent},
    {path: 'Listado', component: ListadoComponent},
    {path: 'formulario', component: FormularioComponent},
    {path: 'Libro/:id', component: LibroComponent},
    {path: 'Listado/:categoria', component: ListadoComponent},
    {path: 'Busqueda', component: BusquedaComponent},
    {path: '**', component: ErrorComponent}
]

export const appRoutingProviders: any[ ] =[ ];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

