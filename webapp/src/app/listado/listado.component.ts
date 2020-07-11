import { Component, OnInit } from '@angular/core';
import { Libro }	 from '../libro/libro';
import { LibroService } 	from '../services/libro.service';
import { Router, ActivatedRoute, Params }	from '@angular/router';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css'],
  providers:[ LibroService]
})
export class ListadoComponent implements OnInit {


	//Array que se utilizara para guardar la respuesta de la query
	public libros: Libro[] = new Array<Libro>();


  constructor(
  		public _libroService: LibroService,
  		public _route: ActivatedRoute,
  		public _router: Router
  	){}

  ngOnInit(): void {
  	this.getListaCategoria();
  	console.log(this.libros);
  }

// Obtiene la lista de libros por params = categoria
  getListaCategoria(){
   this._route.params.forEach((params: Params) => {
            let categoria = params['categoria']

            this._libroService.getLibrosCategoria(categoria).subscribe(
					result => {
					for(let i = 0; i<result['data'].length; i++){
                      this.libros.push(result['data'][i] as Libro);
                    }
                },
					error => {
						console.log(<any> error);

					}
				);
        });
    }

    aumentarCarrito(id){
    	this._libroService.sumarCarrito(id).subscribe();
      alert("El libro ha sido agregado al carrito!");
    } 

    //funcion para agregar a carrito de forma directa
    addToCarrito(id){
    	this._libroService.addLibroCarrito(id).subscribe();
    } 

}


