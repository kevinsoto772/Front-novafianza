import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputBusquedaComponent } from './componentes/input-busqueda/input-busqueda.component';
import { InputArchivoComponent } from './componentes/input-archivo/input-archivo.component';



@NgModule({
  declarations: [
    InputBusquedaComponent,
    InputArchivoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InputBusquedaComponent,
    InputArchivoComponent
  ]
})
export class InputsModule { }
