import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { RestaurantesService } from 'src/app/services/restaurantes.service';

@Component({
  selector: 'app-gestion-rest',
  templateUrl: './gestion-rest.component.html',
  styleUrls: ['./gestion-rest.component.css']
})
export class GestionRestComponent implements OnInit {

  config: any;
  collection = { count: 5, data: [] as any[] }
  idDocUpdate: string;
  btnActualizar: boolean;

  restauranteForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private restServices: RestaurantesService

  ) {
    this.idDocUpdate = '';
    this.btnActualizar = false;
    this.restauranteForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      categoria: new FormControl('', Validators.required),
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

    this.restServices.getRest().subscribe(respuesta => {
      this.collection.data = respuesta.map((e: any) => {
        return {
          idDoc: e.payload.doc.id,
          nombre: e.payload.doc.data().nombre,
          descripcion: e.payload.doc.data().descripcion,
          categoria: e.payload.doc.data().categoria,
          imagen: e.payload.doc.data().imagen
        }
      })
    }, error => {
      console.log(error)
    })

  }

  pageChanged(event: number) {
    this.config.currentPage = event;
  }

  guardarRest(): void {
    this.restServices.createRest(this.restauranteForm.value).then(respuesta => {
      this.restauranteForm.reset();
      this.modalService.dismissAll();
    }).catch(error => {
      console.log(error)
    })
  }
 
  actualizarRest() {
    if(this.idDocUpdate !== null || this.idDocUpdate !== undefined) {
      this.restServices.updateRest(this.idDocUpdate , this.restauranteForm.value).then(resp => {
        this.restauranteForm.reset();
        this.modalService.dismissAll();
      }).catch(error => {
        console.log(error)
      })
    }
  }

  eliminarRest(item: any): void {
    this.restServices.deleteRest(item.idDoc)
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
    this.restauranteForm.setValue({
      //idDoc: item.idDoc,
      nombre: item.nombre,
      descripcion: item.descripcion,
      categoria: item.categoria,
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
    this.restauranteForm.reset();
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
