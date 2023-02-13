import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorEmpresaComponent } from './componentes/selector-empresa/selector-empresa.component';
import { PaginaAdministrarEmpresasComponent } from './componentes/pagina-administrar-empresas/pagina-administrar-empresas.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    SelectorEmpresaComponent,
    PaginaAdministrarEmpresasComponent,
  ],
  imports: [
    CommonModule,
    NgbModule
  ],
  exports: [
    SelectorEmpresaComponent
  ]
})
export class EmpresasModule { }
