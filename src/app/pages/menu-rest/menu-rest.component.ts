import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu-rest',
  templateUrl: './menu-rest.component.html',
  styleUrls: ['./menu-rest.component.css']
})
export class MenuRestComponent {

  collection = { count: 6, data: [] as any[] };

  restPlatos: any[] = [];

  constructor(private restServices: MenuService) {}

  ngOnInit(): void {
    this.restServices.getRest().subscribe(
      (respuesta: any[]) => {
        this.restPlatos = respuesta.map((e: any) => ({
          idDoc: e.payload.doc.id,
          canitdad: e.payload.doc.data().canitdad,
          idRest: e.payload.doc.data().idRest,
          nombre: e.payload.doc.data().nombre,
          precio: e.payload.doc.data().precio,
          imagen: e.payload.doc.data().imagen
        }));
        this.collection.data = this.restPlatos;
      },
      error => {
        console.log(error)
      }
    );
  }

  filtrarPorRestaurante(idRest: string): void {
    if (idRest === 'Todos') {
      this.collection.data = this.restPlatos;
    } else {
      this.collection.data = this.restPlatos.filter(idRest => idRest.idRest === idRest);
    }
  }

}
