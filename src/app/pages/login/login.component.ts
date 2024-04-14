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
      password: new FormControl(),
      nombre: new FormControl(''),
      telefono: new FormControl('No data'),
      ubicacion: new FormControl('No data'),
      nacimiento: new FormControl('No data'),
      rol: new FormControl('No data'),
      fotoPerfil: new FormControl('No data'),
    })
  }

  onSubmit() {
    const passwordControl = this.formLogin.get('password');

    if (!passwordControl) {
      console.error("El control de contraseña no se encontró en el formulario.");
      return;
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
      .then((userData: any) => {
        const { email, username } = userData;
        const userEmail = email;
        const nameUser = username;
        
        this.userservices.getUserByEmail(userEmail)
          .then((existingUser: any) => {
            if (existingUser) {
              this.router.navigate(['']);
              Swal.fire({
                icon: 'success',
                title: 'Inicio de Sesión con Google Exitoso',
                text: '¡Bienvenido!',
                timer: 2000,
                background: 'rgba(255, 241, 241, 1)',
                color: 'rgba(80, 0, 0, 1)',
                confirmButtonColor: 'rgba(177, 3, 3, 1)',
              });
            } else {
              // Si el email no está registrado, procede a crear un nuevo usuario en la colección de usuarios
              this.formLogin.patchValue({ email: userEmail });
              this.formLogin.patchValue({ nombre: nameUser });
              this.userservices.createUsu(this.formLogin.value)
                .then(respuesta => {
                  console.log(respuesta);
                  // Redirige al usuario y muestra un mensaje de éxito
                  this.router.navigate(['']);
                  Swal.fire({
                    icon: 'success',
                    title: 'Inicio de Sesión con Google Exitoso',
                    text: '¡Bienvenido!',
                    timer: 2000,
                    background: 'rgba(255, 241, 241, 1)',
                    color: 'rgba(80, 0, 0, 1)',
                    confirmButtonColor: 'rgba(177, 3, 3, 1)',
                  });
                })
                .catch(error => {
                  console.log(error);
                });
            }
          })
          /*.catch(error: => {
            console.log(error);
          });*/
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Error en inicio de sesión con Google',
          text: 'No se pudo iniciar sesión con Google.',
          background: '#212529',
          color: 'white'
        });
      });
  }
}
