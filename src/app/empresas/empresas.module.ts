import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorEmpresaComponent } from './componentes/selector-empresa/selector-empresa.component';
import { PaginaAdministrarEmpresasComponent } from './componentes/pagina-administrar-empresas/pagina-administrar-empresas.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalCrearEmpresaComponent } from './componentes/modal-crear-empresa/modal-crear-empresa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalActualizarEmpresaComponent } from './componentes/modal-actualizar-empresa/modal-actualizar-empresa.component';
import { AdministradorCompartidoModule } from '../administrador-compartido/administrador-compartido.module';

@NgModule({
  declarations: [
    SelectorEmpresaComponent,
    PaginaAdministrarEmpresasComponent,
    ModalCrearEmpresaComponent,
    ModalActualizarEmpresaComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
/*     AdministradorCompartidoModule
 */  ],
  exports: [
    SelectorEmpresaComponent
  ]
})
export class EmpresasModule { }
