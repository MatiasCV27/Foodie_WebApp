import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu-rest',
  templateUrl: './menu-rest.component.html',
  styleUrls: ['./menu-rest.component.css']
})
export class MenuRestComponent implements OnInit{

  collection = { count: 6, data: [] as any[] };

  restPlatos: any[] = [];
  tituloMenu: string = 'Menú General';

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    if (window.history.state && window.history.state.platos) {
      this.restPlatos = window.history.state.platos;
      if (this.restPlatos.length > 0) {
        this.tituloMenu = this.restPlatos[0].idRest;
      } else {
        this.tituloMenu = 'Menú General';
      }
    } else{
      this.menuService.getRest().subscribe(
        (respuesta: any[]) => {
          this.restPlatos = respuesta.map((e: any) => ({
            idDoc: e.payload.doc.id,
            cantidad: e.payload.doc.data().cantidad,
            idRest: e.payload.doc.data().idRest,
            nombre: e.payload.doc.data().nombre,
            descripcion: e.payload.doc.data().descripcion,
            precio: e.payload.doc.data().precio,
            imagen: e.payload.doc.data().imagen
          }));
          this.collection.data = this.restPlatos;
          this.tituloMenu = 'Menú General';
        },
        error => {
          console.log(error)
        }
      );
    }
  }
  
}
