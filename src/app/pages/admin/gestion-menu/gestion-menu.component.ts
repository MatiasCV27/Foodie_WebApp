import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { MenuService } from 'src/app/services/menu.service';
import { RestaurantesService } from 'src/app/services/restaurantes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-menu',
  templateUrl: './gestion-menu.component.html',
  styleUrls: ['./gestion-menu.component.css']
})
export class GestionMenuComponent implements OnInit{

  config: any;
  collection = { count: 5, data: [] as any[] }
  idDocUpdate: string;
  btnActualizar: boolean;
  restaurantes= { count: 5, data: [] as any[] }

  menuForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private menuServices: MenuService,
    private restauranteServices: RestaurantesService

  ) {
    this.idDocUpdate = '';
    this.btnActualizar = false;
    this.menuForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      cantidad: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
      precio: new FormControl('', Validators.required),
      imagen: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.idDocUpdate = "";

    this.config = {
      itemsPerPage: 10,
      currentPage: 1,
      totalItem: this.collection.count
    }

    this.menuServices.getMen().subscribe(respuesta => {
      this.collection.data = respuesta.map((e: any) => {
        return {
          idDoc: e.payload.doc.id,
          nombre: e.payload.doc.data().nombre,
          descripcion: e.payload.doc.data().descripcion,
          cantidad: e.payload.doc.data().cantidad,
          categoria: e.payload.doc.data().categoria,
          precio: e.payload.doc.data().precio,
          imagen: e.payload.doc.data().imagen
        }
      })
    }, error => {
      console.log(error)
    })

    this.restauranteServices.getRest().subscribe(respuesta => {
      this.restaurantes.data = respuesta.map((e: any) => {
        return {
          nombre: e.payload.doc.data().nombre,
        }
      })
    }, error => {
      console.log(error)
    })

  }

  pageChanged(event: number) {
    this.config.currentPage = event;
  }

  guardarMen(): void {
    this.menuServices.createMen(this.menuForm.value).then(respuesta => {
      this.menuForm.reset();
      this.modalService.dismissAll();
      Swal.fire({
        icon: 'success',
        title: 'Menú Guardado Correctamente',
        text: '¡Éxito!',
        timer: 2000,
        background: 'rgba(255, 241, 241, 1)',
        color: 'rgba(80, 0, 0, 1)',
        confirmButtonColor: 'rgba(177, 3, 3, 1)',
      });
    }).catch(error => {
      console.log(error);
      Swal.fire('¡Error!', 'Hubo un Error al Guardar el Menú', 'error');
    });
  }

  actualizarMen() {
    if(this.idDocUpdate !== null || this.idDocUpdate !== undefined) {
      this.menuServices.updateMen(this.idDocUpdate , this.menuForm.value).then(resp => {
        this.menuForm.reset();
        this.modalService.dismissAll();
        Swal.fire({
          icon: 'success',
          title: 'Menú Actualizado Correctamente',
          text: '¡Éxito!',
          timer: 2000,
          background: 'rgba(255, 241, 241, 1)',
          color: 'rgba(80, 0, 0, 1)',
          confirmButtonColor: 'rgba(177, 3, 3, 1)',
        });
      }).catch(error => {
        console.log(error);
        Swal.fire('¡Error!', 'Hubo un Error al Actualizar el Menú', 'error');
      });
    }
  }

  eliminarMen(item: any): void {
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
        this.menuServices.deleteMen(item.idDoc).then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Menú Eliminado Correctamente',
            text: '¡Éxito!',
            timer: 2000,
            background: 'rgba(255, 241, 241, 1)',
            color: 'rgba(80, 0, 0, 1)',
            confirmButtonColor: 'rgba(177, 3, 3, 1)',
          });
        }).catch(error => {
          console.log(error);
          Swal.fire('¡Error!', 'Hubo un Error al Eliminar el Menú', 'error');
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
    this.menuForm.setValue({
      //idDoc: item.idDoc,
      nombre: item.nombre,
      descripcion: item.descripcion,
      cantidad: item.cantidad,
      categoria: item.categoria,
      precio: item.precio,
      imagen: item.imagen,
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
    this.menuForm.reset();
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
