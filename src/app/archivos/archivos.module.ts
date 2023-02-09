import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginaCargaArchivosComponent } from './componentes/carga-archivos/pagina-carga-archivos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PaginaCargaArchivosComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    PaginaCargaArchivosComponent
  ]
})
export class ArchivosModule { }
