import { HttpClient, HttpResponse, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Injectable }	from '@angular/core';
import { Observable } 	from 'rxjs';
import { map } 			from 'rxjs/operators';
import { Libro } 	from '../libro/libro';
import { GLOBAL }	from '../models/GLOBAL';
import { Comentario } from '../libro/comentario';


@Injectable()


export class LibroService{

	 public url:string;
	 public cat:string;

	 constructor(public _http : HttpClient){
	 	this.url=GLOBAL.url;
	 }

	 // Funcion que consulta los 3 mejores libros de la base de datos "libros"
   getLibroBest(){
	return this._http.get(this.url+'libro-best');
	}
	getLibros(){
		return this._http.get(this.url+'libros');
	}
 	
 	//Retorna un libro por el id en parametro
 	getLibroID(id){
 		return this._http.get(this.url+'libros/'+id)
 	}

 	//Retorna los libros acorde al parametro categoría
 	getLibrosCategoria(categoria){
 		return this._http.get(this.url+'filter/'+categoria);
 	}

 	//Retorna todos los libros que se encuentren actualmente en el carrito
 	getLibrosCarrito(){
 		return this._http.get(this.url+'carrito');
 	}

 	// Agrega el producto, a traves de su id, al carrito de compras
 	addLibroCarrito(id){
 		let headers = new HttpHeaders ({'content-Type':'application/x-www-form-urlencoded'});
 		return this._http.post<any>(this.url+'carrito/'+id, { idLibro : 'id'}, {headers: headers} );
 	}

 	// Elimina del carrito un libro por id
 	deleteLibroCarrito(id){
 		return this._http.get(this.url+'delete/'+id);
 	}

 	// Retorna el libro, a traves de su id, que se encuentre en el carrito
 	cantidadCarrito(id){
 		return this._http.get(this.url+'cantidad/'+id);
 	}

 	// Suma +1 a la cantidad del libro a traves del id, en el carrito
 	sumarCarrito(id){
 		let headers = new HttpHeaders ({'content-Type':'application/x-www-form-urlencoded'});
 		return this._http.post<any>(this.url+'aumentar/'+id, {idLibro : 'id'}, {headers: headers});
 	}

 	// Resta -1 a la cantidad del libro a traves del id, en el carrito
 	restarCarrito(id){
 		let headers = new HttpHeaders ({'content-Type':'application/x-www-form-urlencoded'});
 		return this._http.post<any>(this.url+'reducir/'+id, {idLibro : 'id'}, {headers: headers});
 	}

 	actualizarCarrito(){
 		let headers = new HttpHeaders ({'content-Type':'application/x-www-form-urlencoded'});
 		return this._http.post<any>(this.url+'borrar',{}, {headers: headers});
 	}

 	getComments(nombre){
 		return this._http.get(this.url+'load-comentario/'+nombre);
 	}

 	submitDatosComentario(comentario: Comentario){
 		let json = JSON.stringify(comentario);
 		let params = 'json='+json;
 		let headers = new HttpHeaders ({'content-Type':'application/x-www-form-urlencoded'});
 		return this._http.post(this.url+'subir-comentario', params, {headers: headers});
 	}

 	librosRecomendados(id:number, categoria:string){
 		return this._http.get(this.url+'recomendados/'+categoria+'/'+id);
 	}
}

