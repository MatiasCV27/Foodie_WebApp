import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(private firestore: AngularFirestore) { }

  getVent() {
    return this.firestore.collection("ventas").snapshotChanges();
  }

  /*createVent(asociados: any){
    return this.firestore.collection("ventas").add(asociados);
  }

  updateVent(id: any, asociados: any){
    return this.firestore.collection("ventas").doc(id).update(asociados);
  }

  deleteVent(id: any) {
    return this.firestore.collection("ventas").doc(id).delete();
  }*/

}
