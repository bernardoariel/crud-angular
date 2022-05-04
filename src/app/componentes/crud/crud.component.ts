import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from "@angular/forms";
import { Producto } from 'src/app/modelo/producto.model';
import { ProductoService } from "../../services/producto.service";

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

  productoForm!: FormGroup;
  producto: Producto = new Producto();
  constructor(private fb: FormBuilder, private productoService:ProductoService) { }

  ngOnInit(): void {
    this.iniciaFormulario()
    this.obtenerProductos();
  }

  iniciaFormulario(){
    this.productoForm = this.fb.group({
      nombre: [''],
      cantidad: [''],
      descripcion: [''],
      id:['']
    })
  }
  guardar(){
    this.producto={
      nombre: this.productoForm.get('nombre').value ,
      cantidad: this.productoForm.get('cantidad').value,
      descripcion: this.productoForm.get('descripcion').value
    }  
    this.productoService.guardarProducto(this.producto)
      .subscribe(respuesta =>{
        console.log(respuesta);
      })

  }

  obtenerProductos(){
    this.productoService.obtenerProductos()
      .subscribe( respuesta =>{
        console.log("lista de productos", respuesta)
      })
  }

}
