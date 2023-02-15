import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginaHistorialNovedadesComponent } from './componentes/pagina-historial-novedades/pagina-historial-novedades.component';
import { ModalDetallesArchivoComponent } from './componentes/modal-detalles-archivo/modal-detalles-archivo.component';
import { NavegacionModule } from '../navegacion/navegacion.module';
import { InformacionArchivoComponent } from './componentes/informacion-archivo/informacion-archivo.component';
import { TabValidacion } from './componentes/tab-validacion-estructura/tab-validacion-estructura.component';
import { TabValidacionDatosComponent } from './componentes/tab-validacion-datos/tab-validacion-datos.component';
import { TablaNovedadesComponent } from './componentes/tabla-novedades/tabla-novedades.component';
import { EmpresasModule } from '../empresas/empresas.module';



@NgModule({
  declarations: [
    PaginaHistorialNovedadesComponent,
    ModalDetallesArchivoComponent,
    InformacionArchivoComponent,
    TabValidacion,
    TabValidacionDatosComponent,
    TablaNovedadesComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    /* Modulos propios */
    NavegacionModule,
    EmpresasModule
  ]
})
export class HistorialNovedadesModule { }
