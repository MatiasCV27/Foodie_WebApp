import { Component, OnInit,TemplateRef,inject  } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  collection = { count: 7, data: [] as any[] }
  config: any;
  usuarios: any[] = [];
  idDocUpdate: string;
  btnActualizar: boolean;
  usuarioForm: FormGroup;

  constructor(private userServices: UserService, private afAuth: AngularFireAuth, public fb: FormBuilder) {
    this.idDocUpdate = '';
    this.btnActualizar = false;
    this.usuarioForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      ubicacion: new FormControl('', Validators.required),
      nacimiento: new FormControl('', Validators.required),
    }) 
  }

  ngOnInit(): void {
    this.idDocUpdate = "";
    
    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItem: this.collection.count
    }
    
    const correoAFiltrar = 'betzaberh.04@gmail.com';

    this.userServices.getUsu().subscribe(
      (respuesta: any[]) => {
        this.usuarios = respuesta
          .map((e: any) => ({
            idDoc: e.payload.doc.id,
            nombre: e.payload.doc.data().nombre,
            email: e.payload.doc.data().email,
            telefono: e.payload.doc.data().telefono,
            ubicacion: e.payload.doc.data().ubicacion,
            nacimiento: e.payload.doc.data().nacimiento,
          }))
          .filter((usuario: any) => usuario.email === correoAFiltrar);

        this.collection.data = this.usuarios;
      },
      error => {
        console.log(error)
      }
    );
  }

  actualizarUsuario() {
    if(this.idDocUpdate !== null || this.idDocUpdate !== undefined) {
      this.userServices.updateUsu(this.idDocUpdate , this.usuarioForm.value).then(resp => {
        this.usuarioForm.reset();
        this.modalService.dismissAll();
      }).catch(error => {
        console.log(error)
      })
    }
  }

  private modalService = inject(NgbModal);
	closeResult = '';

  openEdit(content: TemplateRef<any>, item: any) {
    // Llena el form para editar
    this.usuarioForm.setValue({
      //idDoc: item.idDoc,
      nombre: item.nombre,
      email: item.email,
      telefono: item.telefono,
      ubicacion: item.ubicacion,
      nacimiento: item.nacimiento
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

