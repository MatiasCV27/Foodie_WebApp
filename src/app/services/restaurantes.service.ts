import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantesService {

  constructor(private firestore: AngularFirestore) { }

  getRest() {
    return this.firestore.collection("restaurantes").snapshotChanges();
  }

  createRest(restaurante: any) {
    return this.firestore.collection("restaurantes").add(restaurante);
  }

  updateRest(id: any, restaurante: any) {
    return this.firestore.collection("restaurantes").doc(id).update(restaurante);
  }

  deleteRest(id: any) {
    return this.firestore.collection("restaurantes").doc(id).delete();
  }
}
