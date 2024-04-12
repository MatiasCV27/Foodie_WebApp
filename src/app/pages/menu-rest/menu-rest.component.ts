import { Component } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-menu-rest',
  templateUrl: './menu-rest.component.html',
  styleUrls: ['./menu-rest.component.css']
})
export class MenuRestComponent {

  constructor(private carritoService: CarritoService) {
    this.carritoService.loadCarritoScript();
  }

}
