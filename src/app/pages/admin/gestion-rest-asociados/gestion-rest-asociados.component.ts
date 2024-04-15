import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { RestAsociadosService } from 'src/app/services/rest-asociados.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-rest-asociados',
  templateUrl: './gestion-rest-asociados.component.html',
  styleUrls: ['./gestion-rest-asociados.component.css']
})
export class GestionRestAsociadosComponent implements OnInit{

  config: any;
  collection = { count: 5, data: [] as any[] }
  idDocUpdate: string;
  btnActualizar: boolean;

  asociadosForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private asociadosServices: RestAsociadosService

  ) {
    this.idDocUpdate = '';
    this.btnActualizar = false;
    this.asociadosForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      fecha: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      idRest: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.idDocUpdate = "";

    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItem: this.collection.count
    }

    this.asociadosServices.getAsoc().subscribe(respuesta => {
      this.collection.data = respuesta.map((e: any) => {
        return {
          idDoc: e.payload.doc.id,
          nombre: e.payload.doc.data().nombre,
          fecha: e.payload.doc.data().fecha,
          descripcion: e.payload.doc.data().descripcion,
          idRest: e.payload.doc.data().idRest
        }
      })
    }, error => {
      console.log(error)
    })

  }

  pageChanged(event: number) {
    this.config.currentPage = event;
  }

  guardarAsoc(): void {
    this.asociadosServices.createAsoc(this.asociadosForm.value).then(respuesta => {
      this.asociadosForm.reset();
      this.modalService.dismissAll();
      Swal.fire({
        icon: 'success',
        title: 'Acuerdo Comercial Guardado Correctamente',
        text: '¡Éxito!',
        timer: 2000,
        background: 'rgba(255, 241, 241, 1)',
        color: 'rgba(80, 0, 0, 1)',
        confirmButtonColor: 'rgba(177, 3, 3, 1)',
      });
    }).catch(error => {
      console.log(error)
      Swal.fire('¡Error!', 'Hubo un Error al Guardar el Acuerdo Comercial', 'error');
    })
  }

  actualizarAsoc() {
    if(this.idDocUpdate !== null || this.idDocUpdate !== undefined) {
      this.asociadosServices.updateAsoc(this.idDocUpdate , this.asociadosForm.value).then(resp => {
        this.asociadosForm.reset();
        this.modalService.dismissAll();
        Swal.fire({
          icon: 'success',
          title: 'Acuerdo Comercial Actualizado Correctamente',
          text: '¡Éxito!',
          timer: 2000,
          background: 'rgba(255, 241, 241, 1)',
          color: 'rgba(80, 0, 0, 1)',
          confirmButtonColor: 'rgba(177, 3, 3, 1)',
        });
      }).catch(error => {
        console.log(error)
        Swal.fire('¡Error!', 'Hubo un Error al Actualizar el Acuerdo Comercial', 'error');
      })
    }
  }

  eliminarAsoc(item: any): void {
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
        this.asociadosServices.deleteAsoc(item.idDoc).then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Acuerdo Comercial Eliminado Correctamente',
            text: '¡Éxito!',
            timer: 2000,
            background: 'rgba(255, 241, 241, 1)',
            color: 'rgba(80, 0, 0, 1)',
            confirmButtonColor: 'rgba(177, 3, 3, 1)',
          });
        }).catch(error => {
          console.log(error);
          Swal.fire('¡Error!', 'Hubo un Error al Eliminar el Acuerdo Comercial', 'error');
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
    this.asociadosForm.setValue({
      //idDoc: item.idDoc,
      nombre: item.nombre,
      fecha: item.fecha,
      descripcion: item.descripcion,
      idRest: item.idRest,
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
    this.asociadosForm.reset();
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
