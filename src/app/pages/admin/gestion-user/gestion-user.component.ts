import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-user',
  templateUrl: './gestion-user.component.html',
  styleUrls: ['./gestion-user.component.css']
})
export class GestionUserComponent implements OnInit{

  config: any;
  collection = { count: 5, data: [] as any[] }
  idDocUpdate: string;
  btnActualizar: boolean;

  usuarioForm: FormGroup;
  roles: string[] = ['ADMIN', 'USER'];

  constructor(
    public fb: FormBuilder,
    private userService: UserService

  ) {
    this.idDocUpdate = '';
    this.btnActualizar = false;
    this.usuarioForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      ubicacion: new FormControl('', Validators.required),
      nacimiento: new FormControl('', Validators.required),
      rol: new FormControl('', Validators.required),
      fotoPerfil: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.idDocUpdate = "";

    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItem: this.collection.count
    }

    this.userService.getUsu().subscribe(respuesta => {
      this.collection.data = respuesta.map((e: any) => {
        return {
          idDoc: e.payload.doc.id,
          nombre: e.payload.doc.data().nombre,
          email: e.payload.doc.data().email,
          telefono: e.payload.doc.data().telefono,
          ubicacion: e.payload.doc.data().ubicacion,
          nacimiento: e.payload.doc.data().nacimiento,
          rol: e.payload.doc.data().rol,
          fotoPerfil: e.payload.doc.data().fotoPerfil
        }
      })
    }, error => {
      console.log(error)
    })

  }

  pageChanged(event: number) {
    this.config.currentPage = event;
  }

  guardarUsuario(): void {
    this.userService.createUsu(this.usuarioForm.value).then(respuesta => {
      this.usuarioForm.reset();
      this.modalService.dismissAll();
      Swal.fire({
        icon: 'success',
        title: 'Usuario Guardado Correctamente',
        text: '¡Éxito!',
        timer: 2000,
        background: 'rgba(255, 241, 241, 1)',
        color: 'rgba(80, 0, 0, 1)',
        confirmButtonColor: 'rgba(177, 3, 3, 1)',
      });
    }).catch(error => {
      console.log(error)
      Swal.fire('¡Error!', 'Hubo un Error al Guardar el Usuario', 'error');
    })
  }

  actualizarUsuario() {
    if(this.idDocUpdate !== null || this.idDocUpdate !== undefined) {
      this.userService.updateUsu(this.idDocUpdate , this.usuarioForm.value).then(resp => {
        this.usuarioForm.reset();
        this.modalService.dismissAll();
        Swal.fire({
          icon: 'success',
          title: 'Usuario Actualizado Correctamente',
          text: '¡Éxito!',
          timer: 2000,
          background: 'rgba(255, 241, 241, 1)',
          color: 'rgba(80, 0, 0, 1)',
          confirmButtonColor: 'rgba(177, 3, 3, 1)',
        });
      }).catch(error => {
        console.log(error)
        Swal.fire('¡Error!', 'Hubo un Error al Actualizar el Usuario', 'error');
      })
    }
  }

  eliminarRest(item: any): void {
    Swal.fire({
      title: '¿Estás Seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'question',
      background: 'rgba(255, 241, 241, 1)',
      color: 'rgba(80, 0, 0, 1)',
      showCancelButton: true,
      confirmButtonColor: '#B10303',
      cancelButtonColor: '#500000',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUsu(item.idDoc).then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Usuario Eliminado Correctamente',
            text: '¡Éxito!',
            timer: 2000,
            background: 'rgba(255, 241, 241, 1)',
            color: 'rgba(80, 0, 0, 1)',
            confirmButtonColor: 'rgba(177, 3, 3, 1)',
          });
        }).catch(error => {
          console.log(error);
          Swal.fire('¡Error!', 'Hubo un Error al Eliminar el Usuario', 'error');
        });
      }
    });
  }  

  // Modal
  private modalService = inject(NgbModal);
	closeResult = '';

  openSave(content: TemplateRef<any>) {
    this.btnActualizar = false;
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

  openEdit(content: TemplateRef<any>, item: any) {
    // Llena el form para editar
    this.usuarioForm.setValue({
      //idDoc: item.idDoc,
      nombre: item.nombre,
      email: item.email,
      telefono: item.telefono,
      ubicacion: item.ubicacion,
      nacimiento: item.nacimiento,
      rol: item.rol,
      fotoPerfil: item.fotoPerfil,
    })
    // Asignar ID
    this.idDocUpdate = item.idDoc
    this.btnActualizar = true;

		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
    this.usuarioForm.reset();
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}

}
