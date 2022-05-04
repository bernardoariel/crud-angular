import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Producto } from '../modelo/producto.model';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url: any = `${ environment.url }/productos.json`
  constructor(private http:HttpClient) { }

  /**
   * 
   * @param producto 
   */
  guardarProducto(producto:Producto){
    return this.http.post(this.url, producto)
  }
  /**
   *
   */
  obtenerProductos(){
    
    return this.http.get(this.url)
      .pipe(
        map(this.arregloProducto)
      )

  }
  /**
   * transforma la respuesta en arreglo
   * @param prod 
   */
  arregloProducto(prod: object){

    console.log('prod', prod)

    let productos: Producto[] = [];

    if(prod !== null){
      Object.keys(prod).forEach( (llave:any) =>{
        let producto: Producto = prod[llave];
        producto.id = llave;
        producto.push(producto);
      }
    }

  }

}
