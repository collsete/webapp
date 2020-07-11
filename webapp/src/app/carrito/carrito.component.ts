import { Component, OnInit } from '@angular/core';
import { Libro }	 from '../libro/libro';
import { LibroService } 	from '../services/libro.service';
import { Router, ActivatedRoute, Params }	from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  providers: [LibroService]
})
export class CarritoComponent implements OnInit {

	public carritoLibros: Libro[] = new Array<Libro>();
	public libro: Libro;
	public total:number = 0;
  public caunt: number =0;
  public exchange: number =0;
  public cantidades: number[]; 


  constructor(
  				public _libroService: LibroService,
  				public _router: Router,
  				public _route: ActivatedRoute
  	){}

  ngOnInit(): void {
  	this.getCarritoLibros();
  }

  getCarritoLibros(){
  		this._libroService.getLibrosCarrito().subscribe(
  					result => {
						console.log(result);
				            	for(let i = 0; i<result['data'].length; i++){
                      this.carritoLibros.push(result['data'][i] as Libro);
                      this.contarCarrito(this.carritoLibros[i].id, this.carritoLibros[i].precio, i);
                      //console.log(this.carritoLibros[i]);
                     }
                },
					error => {
						  console.log(<any> error);
			  }
  		)
    }
     reducirCarrito(id){
      this._libroService.restarCarrito(id).subscribe();
      alert("Se ha removido el libro del carrito");
    }

    contarCarrito(id:number, a:number, b:number) {
      this._libroService.cantidadCarrito(id).subscribe(
        response=>{
               let contador = response['data'].cantidad;
               let aux = a;
               let suma = a * contador;
               this.total += suma;
               this.carritoLibros[b].precio = suma;
          }
        )
    }
}

// Funciones manuales para confirmar cantidad y para eliminar algo de la base de datos
/*
    confirmarCantidad(id){
      this._libroService.cantidadCarrito(id).subscribe(
          response =>{  
            if ( response['data'].cantidad > 0){
              this.reducirCarrito(id);
            }
          },
          error => {
          }
        );
    }
    */ 

 /*   removeItem(id){
      this._libroService.deleteLibroCarrito(id).subscribe(
          response => {
              this._router.navigate(['Carrito']);
              console.log(response);
        },
        error => {
          console.log(<any> error);
        });
    } */
/*
  this.contarCarrito(this.carritoLibros[i].id);
                      let contador = this.exchange; //cantidad por id
                      let aux = this.carritoLibros[i].precio; // precio del carrito
                      let suma = (contador * aux); //multiplicacion
                      this.carritoLibros[i].precio = suma;
                      this.total += suma; */

                      /*      for (let j = 0; j<this.carritoLibros.length; j++){
                          this.contarCarrito(this.carritoLibros[j].id);
                          let contador:number = this.exchange;
                          let aux:number = this.carritoLibros[j].precio;
                          let suma:number = contador * aux;
                          this.total += suma;
                          this.carritoLibros[j].precio = suma;
                          console.log(contador);
                          console.log(suma);
                          console.log(aux);
                    } */