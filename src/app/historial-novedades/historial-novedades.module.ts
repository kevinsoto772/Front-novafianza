import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginaHistorialNovedadesComponent } from './componentes/pagina-historial-novedades/pagina-historial-novedades.component';
import { ModalDetallesArchivoComponent } from './componentes/modal-detalles-archivo/modal-detalles-archivo.component';



@NgModule({
  declarations: [
    PaginaHistorialNovedadesComponent,
    ModalDetallesArchivoComponent
  ],
  imports: [
    CommonModule,
    NgbModule
  ]
})
export class HistorialNovedadesModule { }
