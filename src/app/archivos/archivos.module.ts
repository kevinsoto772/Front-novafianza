import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginaCargaArchivosComponent } from './componentes/carga-archivos/pagina-carga-archivos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertasModule } from '../alertas/alertas.module';
import { PopupProcesandoComponent } from './componentes/popup-procesando/popup-procesando.component';
import { PaginaGestionArchivosComponent } from './componentes/pagina-gestion-archivos/pagina-gestion-archivos.component';
import { InputsModule } from '../inputs/inputs.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalCrearArchivoComponent } from './componentes/modal-crear-archivo/modal-crear-archivo.component';
import { ModalActualizarArchivoComponent } from './componentes/modal-actualizar-archivo/modal-actualizar-archivo.component';



@NgModule({
  declarations: [
    PaginaCargaArchivosComponent,
    PopupProcesandoComponent,
    PaginaGestionArchivosComponent,
    ModalCrearArchivoComponent,
    ModalActualizarArchivoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AlertasModule,
    InputsModule,
    NgbModule
  ],
  exports: [
    PaginaCargaArchivosComponent
  ]
})
export class ArchivosModule { }
