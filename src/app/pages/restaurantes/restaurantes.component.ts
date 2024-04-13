import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RestaurantesService } from 'src/app/services/restaurantes.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css']
})
export class RestaurantesComponent implements OnInit {

  collection = { count: 5, data: [] as any[] };

  restaurantes: any[] = [];

  constructor(private restServices: RestaurantesService, private menuService: MenuService, private router: Router) {}

  ngOnInit(): void {
    this.restServices.getRest().subscribe(
      (respuesta: any[]) => {
        this.restaurantes = respuesta.map((e: any) => ({
          idDoc: e.payload.doc.id,
          nombre: e.payload.doc.data().nombre,
          descripcion: e.payload.doc.data().descripcion,
          categoria: e.payload.doc.data().categoria,
          imagen: e.payload.doc.data().imagen
        }));
        this.collection.data = this.restaurantes;
      },
      error => {
        console.log(error)
      }
    );
  }

  filtrarPorCategoria(categoria: string): void {
    if (categoria === 'Todos') {
      this.collection.data = this.restaurantes;
    } else {
      this.collection.data = this.restaurantes.filter(restaurante => restaurante.categoria === categoria);
    }
  }

  verMenuRestaurante(nombreRestaurante: string): void {
    console.log('Ver menú del restaurante:', nombreRestaurante);
    this.menuService.getMenuPorRestaurante(nombreRestaurante).subscribe(platosDelRestaurante => {
      this.router.navigate(['/menu-rest'], { state: { platos: platosDelRestaurante } }).then(() => {
      }).catch(error => {
        console.log(error);
      });
    });
  }     

}
