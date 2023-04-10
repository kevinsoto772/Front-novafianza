import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorEmpresaComponent } from './componentes/selector-empresa/selector-empresa.component';
import { PaginaAdministrarEmpresasComponent } from './componentes/pagina-administrar-empresas/pagina-administrar-empresas.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalCrearEmpresaComponent } from './componentes/modal-crear-empresa/modal-crear-empresa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalActualizarEmpresaComponent } from './componentes/modal-actualizar-empresa/modal-actualizar-empresa.component';
import { AdministradorCompartidoModule } from '../administrador-compartido/administrador-compartido.module';
import { ModalAsignarServiciosComponent } from './componentes/modal-asignar-servicios/modal-asignar-servicios.component';
import { AlertasModule } from '../alertas/alertas.module';
import { InputsModule } from '../inputs/inputs.module';
import { ModalAdjuntarManualComponent } from './componentes/modal-adjuntar-manual/modal-adjuntar-manual.component';
import { ModalVisualizarManualComponent } from './componentes/modal-visualizar-manual/modal-visualizar-manual.component';
import { SafePipe } from '../safe.pipe';

@NgModule({
  declarations: [
    SelectorEmpresaComponent,
    PaginaAdministrarEmpresasComponent,
    ModalCrearEmpresaComponent,
    ModalActualizarEmpresaComponent,
    ModalAsignarServiciosComponent,
    ModalAdjuntarManualComponent,
    ModalVisualizarManualComponent,
    SafePipe
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    AlertasModule,
    InputsModule
/*     AdministradorCompartidoModule
 */  ],
  exports: [
    SelectorEmpresaComponent
  ]
})
export class EmpresasModule { }
