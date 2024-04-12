import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { AngularFirestore } from '@angular/fire/compat/firestore'
=======
import { AngularFirestore } from '@angular/fire/compat/firestore';
>>>>>>> BRH-MantMenu

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private firestore: AngularFirestore) { }

<<<<<<< HEAD
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
=======
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

>>>>>>> BRH-MantMenu
}
