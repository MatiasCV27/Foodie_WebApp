import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  formReg: FormGroup;

  constructor(private userservices: UserService, private router: Router) {
    this.formReg = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  onSubmit() {
    if (!this.formReg) {
      console.error('El formulario de registro no está definido.');
      return;
    }

    const passwordControl = this.formReg.get('password');
    if (!passwordControl) {
      console.error('El control de contraseña no está definido en el formulario.');
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
            confirmButtonColor: 'rgba(177, 3, 3, 1)'
        });
        return;
    }

    this.userservices.registro(this.formReg.value)
        .then(response => {
            console.log(response);
            Swal.fire({
              icon: 'success',
              title: 'Registro exitoso',
              text: '¡Su registro ha sido exitoso!',
              background: 'rgba(255, 241, 241, 1)',
              color: 'rgba(80, 0, 0, 1)',
              confirmButtonColor: 'rgba(177, 3, 3, 1)'
            });
            this.router.navigate(['/login']);
        })
        .catch(error => console.log(error));
  }

}
