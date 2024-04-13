import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth:Auth, private firestore: AngularFirestore) { }

  registro({email, password}:any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({email, password}:any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  google(): any {
    const proveedor = new GoogleAuthProvider();
    return signInWithPopup(this.auth, proveedor);
  }
 
  logout() {
    return signOut(this.auth);
  }
  
  getUsu() {
    return this.firestore.collection("users").snapshotChanges();
  }

  createUsu(usuario: any) {
    return this.firestore.collection("users").add(usuario);
  }

  updateUsu(id: any, usuario: any) {
    return this.firestore.collection("users").doc(id).update(usuario);
  }

  deleteUsu(id: any) {
    return this.firestore.collection("users").doc(id).delete();
  }

}
