import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { RestaurantesService } from 'src/app/services/restaurantes.service';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css']
})
export class RestaurantesComponent implements OnInit {

  collection = { count: 5, data: [] as any[] }

  constructor(private restServices: RestaurantesService ) {

  }

  ngOnInit(): void {
    
    this.restServices.getRest().subscribe(respuesta => {
      this.collection.data = respuesta.map((e: any) => {
        return {
          idDoc: e.payload.doc.id,
          nombre: e.payload.doc.data().nombre,
          descripcion: e.payload.doc.data().descripcion,
          categoria: e.payload.doc.data().categoria,
          imagen: e.payload.doc.data().imagen
        }
      })
    }, error => {
      console.log(error)
    })
  }

}
