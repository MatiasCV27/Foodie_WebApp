import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private firestore: AngularFirestore) { }

  getRest() {
    return this.firestore.collection("restPlatos").snapshotChanges();
  }

  createRest(restaurante: any) {
    return this.firestore.collection("restPlatos").add(restaurante);
  }

  updateRest(id: any, restaurante: any) {
    return this.firestore.collection("restPlatos").doc(id).update(restaurante);
  }

  deleteRest(id: any) {
    return this.firestore.collection("restPlatos").doc(id).delete();
  }
  
  getMenuPorRestaurante(nombreRestaurante: string): Observable<any[]> {
    return this.firestore.collection('restPlatos', ref => ref.where('categoria', '==', nombreRestaurante)).snapshotChanges().pipe(
      map(platos => {
        return platos.map(plato => {
          const data: any = plato.payload.doc.data();
          const id = plato.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getMen() {
    return this.firestore.collection("restPlatos").snapshotChanges();
  }

  createMen(menu: any){
    return this.firestore.collection("restPlatos").add(menu);
  }

  updateMen(id: any, menu: any){
    return this.firestore.collection("restPlatos").doc(id).update(menu);
  }

  deleteMen(id: any) {
    return this.firestore.collection("restPlatos").doc(id).delete();
  }

}
