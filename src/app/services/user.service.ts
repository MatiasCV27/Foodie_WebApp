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
    return new Promise<any>((resolve, reject) => {
      const provider = new GoogleAuthProvider();
      signInWithPopup(this.auth, provider)
        .then((result) => {
          const userData = {
            email: result.user.email,
            username: result.user.displayName
          };
          resolve(userData);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getUserByEmail(email: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection('users', ref => ref.where('email', '==', email))
        .valueChanges()
        .subscribe((users) => {
          if (users && users.length > 0) {
            resolve(users[0]);
          } else {
            resolve(null);
          }
        }, error => {
          reject(error);
        });
    });
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
