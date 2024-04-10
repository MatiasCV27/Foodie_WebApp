import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent { 

  formLogin: FormGroup;

  constructor(private userservices: UserService, private router: Router) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  onSubmit() {
    this.userservices.login(this.formLogin.value)
      .then(response => {
        console.log(response);
        this.router.navigate(['']);
        Swal.fire({
          icon: 'success',
          title: 'Inicio de Sesión Exitoso',
          text: '¡Bienvenido de vuelta!',
          timer: 2000 ,
          background: '#212529',
          color: 'white'
        });
      })
      .catch(error => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error en inicio de sesión',
          text: 'Correo electrónico o contraseña incorrectos. Por favor, verifica tus credenciales.',
          background: '#212529',
          color: 'white'
        });
      });
  }

}
