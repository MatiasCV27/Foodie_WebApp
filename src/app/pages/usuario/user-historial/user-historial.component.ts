import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DataService } from 'src/app/services/data.service';
import { VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-user-historial',
  templateUrl: './user-historial.component.html',
  styleUrls: ['./user-historial.component.css']
})
export class UserHistorialComponent implements OnInit {

  collection = { count: 6, data: [] as any[] };

  ventas: any[] = [];

  constructor(private restServices: VentasService, private afAuth: AngularFireAuth, public dataService: DataService) { }

  // Con Correo de Muestra
  ngOnInit(): void {
    const correoAFiltrar = "mark@gmail.com";

    this.restServices.getVent().subscribe(
      (respuesta: any[]) => {
        this.ventas = respuesta
          .map((e: any) => ({
            idDoc: e.payload.doc.id,
            email: e.payload.doc.data().email,
            fecha: e.payload.doc.data().fecha,
            nombres: e.payload.doc.data().nombres,
            pTotal: e.payload.doc.data().pTotal,
            precios: e.payload.doc.data().precios
          }))
          // Filtra las ventas por el correo electrónico
          .filter((venta: any) => venta.email === correoAFiltrar);

        this.collection.data = this.ventas;
      },
      error => {
        console.log(error)
      }
    );

    //Sin Correo
    /*ngOnInit(): void {
      this.restServices.getVent().subscribe(
        (respuesta: any[]) => {
          this.ventas = respuesta.map((e: any) => ({
            idDoc: e.payload.doc.id,
            email: e.payload.doc.data().email,
            fecha: e.payload.doc.data().fecha,
            nombres: e.payload.doc.data().nombres,
            pTotal: e.payload.doc.data().pTotal,
            precios: e.payload.doc.data().precios
          }));
          this.collection.data = this.ventas;
        },
        error => {
          console.log(error)
        }
      );
    }*/

    //Cuando uno se autentifica
    /*ngOnInit(): void {
      this.afAuth.onAuthStateChanged(user => {
        if (user) {
          // Usuario autenticado, obtenemos su correo electrónico
          const correoUsuario = user.email;
          // Llamamos al método para obtener las ventas del usuario actual
          this.obtenerVentasPorCorreo(correoUsuario);
        } else {
          // Usuario no autenticado, limpiamos la lista de ventas
          this.ventas = [];
          this.collection.data = [];
        }
      });
    }
  
    obtenerVentasPorCorreo(correo: string): void {
      this.restServices.getVent().subscribe(
        (respuesta: any[]) => {
          this.ventas = respuesta
            .map((e: any) => ({
              idDoc: e.payload.doc.id,
              email: e.payload.doc.data().email,
              fecha: e.payload.doc.data().fecha,
              nombres: e.payload.doc.data().nombres,
              pTotal: e.payload.doc.data().pTotal,
              precios: e.payload.doc.data().precios
            }))
            // Filtra las ventas por el correo electrónico del usuario
            .filter((venta: any) => venta.email === correo);
  
          this.collection.data = this.ventas;
        },
        error => {
          console.log(error)
        }
      );
    }*/
  }
}
