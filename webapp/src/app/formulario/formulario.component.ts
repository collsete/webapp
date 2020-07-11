import { Component } from '@angular/core';
import { Libro }	from '../libro/libro';
import { Router, ActivatedRoute, Params }	from '@angular/router';
import { LibroService } 	from '../services/libro.service';

@Component({

	selector: 'formulario',
	templateUrl:  './formulario.html',
	providers: [LibroService]
})


export class FormularioComponent{
	public libro: Libro;


	onSubmit(){
		
	}



}