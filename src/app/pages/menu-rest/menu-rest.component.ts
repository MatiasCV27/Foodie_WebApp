import { Component, OnInit } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito.service';
import { MenuService } from 'src/app/services/menu.service';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu-rest',
  templateUrl: './menu-rest.component.html',
  styleUrls: ['./menu-rest.component.css']
})
export class MenuRestComponent implements OnInit{

  collection = { count: 6, data: [] as any[] };

  restPlatos: any[] = [];
  tituloMenu: string = 'Menú General';

  public payPalConfig?: IPayPalConfig;

  constructor(private menuService: MenuService, carritoService: CarritoService) {
    carritoService.loadCarritoScript();
   }

  ngOnInit(): void {

    this.initConfig();

    if (window.history.state && window.history.state.platos) {
      this.restPlatos = window.history.state.platos;
      if (this.restPlatos.length > 0) {
        this.tituloMenu = this.restPlatos[0].categoria;
      } else {
        this.tituloMenu = 'Menú General';
      }
    } else{
      this.menuService.getRest().subscribe(
        (respuesta: any[]) => {
          this.restPlatos = respuesta.map((e: any) => ({
            idDoc: e.payload.doc.id,
            cantidad: e.payload.doc.data().cantidad,
            nombre: e.payload.doc.data().nombre,
            descripcion: e.payload.doc.data().descripcion,
            categoria: e.payload.doc.data().categoria,
            precio: e.payload.doc.data().precio,
            imagen: e.payload.doc.data().imagen
          }));
          this.collection.data = this.restPlatos;
          this.tituloMenu = 'Menú General';
        },
        error => {
          console.log(error)
        }
      );
    }

  }
  //Paypal
  private initConfig(): void {
    this.payPalConfig = {
        currency: 'USD',
        clientId: 'Af3iMYA-ribCizQN2yabwlPWffTEjSqDHBmrAS0o5nse0ZwSGbm2D-L0jdO50QDPvMUnF_BKzZd-wYds',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: '9.99',
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: '9.99'
                        }
                    }
                },
                items: [{
                    name: 'Enterprise Subscription',
                    quantity: '1',
                    category: 'DIGITAL_GOODS',
                    unit_amount: {
                        currency_code: 'USD',
                        value: '9.99',
                    },
                }]
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical',
            color: 'blue',
            shape: 'pill'
        },
        onApprove: (data, actions) => {
            actions.order.get().then((details: any) => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
        },
    };
  }

  pagar() {
    Swal.fire({
      icon: 'success',
      title: 'Compra exitosa!',
      text: '¡Bienvenido de vuelta!',
      timer: 2000,
      background: 'rgba(255, 241, 241, 1)',
      color: 'rgba(80, 0, 0, 1)',
      confirmButtonColor: 'rgba(177, 3, 3, 1)',
    });
  }
}
