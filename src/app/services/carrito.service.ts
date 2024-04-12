import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor() { }

  public loadCarritoScript() {
    console.log('Preparing to load...')
    let node = document.createElement('script');
    node.src = 'assets/js/content-car.js';
    node.type = 'text/javascript';
    node.async = true;
    document.getElementsByTagName('head')[0].appendChild(node);
  }
}
