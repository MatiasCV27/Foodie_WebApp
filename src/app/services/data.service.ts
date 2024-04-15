import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private auth: Auth, private firestore: AngularFirestore) { }

  // Obtener roles
  getUserRole(email: string): Promise<string | null> {
    return new Promise<string | null>((resolve, reject) => {
      this.firestore.collection('users', ref => ref.where('email', '==', email))
        .valueChanges()
        .subscribe((users: any[]) => {
          if (users && users.length > 0 && users[0].rol) {
            resolve(users[0].rol);
          } else {
            resolve(null);
          }
        }, error => {
          reject(error);
        });
    });
  }

  userRol: any;

  setUserRol(role: any) {
    this.userRol = role;
  }

  getUserRol() {
    return this.userRol;
  }

  // Obtener username
  getUsername(email: string): Promise<string | null> {
    return new Promise<string | null>((resolve, reject) => {
      this.firestore.collection('users', ref => ref.where('email', '==', email))
        .valueChanges()
        .subscribe((users: any[]) => {
          if (users && users.length > 0 && users[0].rol) {
            resolve(users[0].email);
          } else {
            resolve(null);
          }
        }, error => {
          reject(error);
        });
    });
  }

  username: any;

  setUsername(name: any) {
    this.username = name;
  }

  getUsern() {
    return this.username;
  }

  // Obtener email
  correo: any;

  setCorreo(c: any) {
    this.correo = c;
  }

  getCorreo() {
    return this.correo;
  }

}
