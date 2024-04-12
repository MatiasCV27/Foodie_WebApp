import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'

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
}
