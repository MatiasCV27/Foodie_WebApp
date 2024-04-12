import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private firestore: AngularFirestore) { }

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
