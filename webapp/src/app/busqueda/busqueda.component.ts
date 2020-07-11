import { Component, OnInit } from '@angular/core';
import { Libro }	 from '../libro/libro';
import { LibroService } 	from '../services/libro.service';
import { Router, ActivatedRoute, Params }	from '@angular/router';
import { GLOBAL }	from '../models/GLOBAL';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest} from '@angular/common/http';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css'],
  providers: [LibroService]
})
export class BusquedaComponent implements OnInit {

 public libros: Libro[] = new Array<Libro>();

  constructor(
  		public _libroService: LibroService,
  		public _route: ActivatedRoute,
  		public _router: Router
  	){}

  ngOnInit(): void {
  	this.getAllLibros();
  }


  	getAllLibros(){
  	   this._libroService.getLibros().subscribe(
		result => {
			for(let i = 0; i<result['data'].length; i++){
            this.libros.push(result['data'][i] as Libro);
             }
            },
			error => {
				console.log(<any> error);
					}
				);
  	}
  	aumentarCarrito(id){
    	this._libroService.sumarCarrito(id).subscribe();
      alert("El libro ha sido agregado al carrito!");
    } 

     addToCarrito(id){
    	this._libroService.addLibroCarrito(id).subscribe();
    } 
}
