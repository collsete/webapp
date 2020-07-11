import { Component, OnInit } from '@angular/core';
import { Libro }	 from '../libro/libro';
import { LibroService } 	from '../services/libro.service';
import { Router, ActivatedRoute, Params }	from '@angular/router';
import { Comentario }  from './comentario';



@Component({
  selector: 'app-libro',
  templateUrl: './libro.component.html',
  styleUrls: ['./libro.component.css'],
  providers: [LibroService]
})

export class LibroComponent implements OnInit {
		public libro: Libro;
    public comment: Comentario;
    public comentarios: Comentario[] = new Array<Comentario>();
    public libros: Libro[] = new Array<Libro>();
    public save:string;


  	constructor( 
  			public _libroService: LibroService,
  			public _route: ActivatedRoute,
  			public _router: Router
  		){
     this.comment = new Comentario (0,"","","","",0);
    }

ngOnInit() {
	this.getLibroDetail();
	console.log(this.libro);
  }

	getLibroDetail(){
        this._route.params.forEach((params: Params) => {
            let id = params['id']

             this._libroService.getLibroID(id).subscribe(
                 response => {
                     this.libro = response['data'];
                     this.getRecomendados();
                     this.getComentarios(this.libro.nombre);
                      console.log(this.comentarios);
                 },
                 error => {
                     console.log(<any>error);

                 }
             );
        });
    }
//ACA FUNCIONA asasasasasasasasasdsasaasaasaasa
    getComentarios(nombre){
      this._libroService.getComments(nombre).subscribe(
        result => {
                for(let i = 0; i<result['data'].length; i++){
                this.comentarios.push(result['data'][i] as Comentario);
                  console.log(this.comentarios[i]);
                   }
        },
        error => {

        }
        );
    }
      cargarComentario(){
          let today = new Date();
          let dd:number = today.getDate();
          let mm:number = today.getMonth() +1;
          let yyyy:number = today.getFullYear();
          let fecha = mm+'-'+ dd + '-' + yyyy;
          this.comment.fecha = fecha;
          this.comment.nombreLibro = this.libro.nombre;
          

          this._libroService.submitDatosComentario(this.comment).subscribe(
              response =>{
                    console.log(response);
              },
                error => {

                }
            );
      }
     aumentarCarrito(id){
      this._libroService.sumarCarrito(id).subscribe();
      alert("Libro añadido al carrito!");
    } 

    getRecomendados(){
      this._route.params.forEach((params: Params)=>{
        let id = params['id']
        let categoria = this.libro.categoria

      this._libroService.librosRecomendados(id,categoria).subscribe(
         result => {
          for(let i = 0; i<result['data'].length; i++){
                      this.libros.push(result['data'][i] as Libro);
                    }
                    console.log(this.libros);
                },
          error => {
            console.log(<any> error);
          }
        );
    });
  }
}
