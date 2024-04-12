import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class RestAsociadosService {

  constructor(private firestore: AngularFirestore) { }

  getAsoc() {
    return this.firestore.collection("acuerdosComerciales").snapshotChanges();
  }

  createAsoc(asociados: any){
    return this.firestore.collection("acuerdosComerciales").add(asociados);
  }

  updateAsoc(id: any, asociados: any){
    return this.firestore.collection("acuerdosComerciales").doc(id).update(asociados);
  }

  deleteAsoc(id: any) {
    return this.firestore.collection("acuerdosComerciales").doc(id).delete();
  }

}
