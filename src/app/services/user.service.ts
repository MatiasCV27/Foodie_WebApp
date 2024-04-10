import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup } from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private auth:Auth) { }

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
  
}
