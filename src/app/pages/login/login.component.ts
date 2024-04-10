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
    const passwordControl = this.formLogin.get('password');

    if (!passwordControl) {
      
      console.error("El control de contraseña no se encontró en el formulario.");
      return;
    }

    const password = passwordControl.value;

    if (password.length < 6) {
      Swal.fire({
        icon: 'error',
        title: 'Error en inicio de sesión',
        text: 'La contraseña debe tener un mínimo de 6 caracteres.',
        background: 'rgba(255, 241, 241, 1)',
        color: 'rgba(80, 0, 0, 1)',
        confirmButtonColor: 'rgba(177, 3, 3, 1)',
      });
      return; // Detener el proceso de inicio de sesión si la contraseña es inválida
    }

  this.userservices.login(this.formLogin.value)
    .then(response => {
      console.log(response);
      this.router.navigate(['']);
      Swal.fire({
        icon: 'success',
        title: 'Inicio de Sesión Exitoso',
        text: '¡Bienvenido de vuelta!',
        timer: 2000,
        background: 'rgba(255, 241, 241, 1)',
        color: 'rgba(80, 0, 0, 1)',
        confirmButtonColor: 'rgba(177, 3, 3, 1)',
      });
    })
    .catch(error => {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Error en inicio de sesión',
        text: 'Correo electrónico o contraseña incorrectos. Por favor, verifica tus credenciales.',
        background: 'rgba(255, 241, 241, 1)',
        color: 'rgba(80, 0, 0, 1)',
        confirmButtonColor: 'rgba(177, 3, 3, 1)',
      });
    });
  }

  onGoogle() {
    this.userservices.google()
    .then(() => {
      this.router.navigate(['']);
      Swal.fire({
        icon: 'success',
        title: 'Inicio de Sesión con Google Exitasamente',
        text: '¡Bienvenido!',
        timer: 2000 ,
        background: 'rgba(255, 241, 241, 1)',
          color: 'rgba(80, 0, 0, 1)',
          confirmButtonColor: 'rgba(177, 3, 3, 1)',
      });
    })
    /*.catch(() => {
      Swal.fire({
        icon: 'error',
        title: 'Error en inicio de sesión con google',
        text: 'No se que poner xd',
        background: '#212529',
        color: 'white'
      });
    });*/
  }
}
