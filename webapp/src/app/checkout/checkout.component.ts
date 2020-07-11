import { Component, OnInit } from '@angular/core';
import { Libro }	 from '../libro/libro';
import { LibroService } 	from '../services/libro.service';
import { Router, ActivatedRoute, Params }	from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [LibroService]
})
export class CheckoutComponent implements OnInit {

  constructor( 
  	public _libroService: LibroService,
  	public _route: ActivatedRoute,
  	public _router: Router
  	){}

  ngOnInit(): void {
  }

  vaciarCarrito(){
  	this._libroService.actualizarCarrito().subscribe();
  	alert("Gracias por comprar con nosotros");
  }
}
