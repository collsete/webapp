import { Component, OnInit } from '@angular/core';
import { Libro }	 from '../libro/libro';
import { LibroService } 	from '../services/libro.service';
import { Router, ActivatedRoute, Params }	from '@angular/router';
import { GLOBAL }	from '../models/GLOBAL';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest} from '@angular/common/http';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: [LibroService]
})
export class InicioComponent implements OnInit {
 			
	public libros: Libro[] = new Array<Libro>();

	constructor(
				private _route: ActivatedRoute,
				private _router: Router,
				private _libroService : LibroService
			){
		}

  ngOnInit(){
  this.losMejores();
  }

  losMejores(){

  		this._libroService.getLibroBest().subscribe(
					result => {
						console.log(result);
					for(let i = 0; i<result['data'].length; i++){
                      this.libros.push(result['data'][i] as Libro);
                    }
                    console.log(this.libros);
                },
					error => {
						console.log(<any> error);

					}
				);
            }



}
