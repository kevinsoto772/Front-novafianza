import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginaVisualizacionVariablesComponent } from './componentes/pagina-visualizacion-variables/pagina-visualizacion-variables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmpresasModule } from '../empresas/empresas.module';
import { InputsModule } from '../inputs/inputs.module';
import { AlertasModule } from '../alertas/alertas.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectorArchivoEntidadComponent } from './componentes/selector-archivo-entidad/selector-archivo-entidad.component';



@NgModule({
  declarations: [
    PaginaVisualizacionVariablesComponent,
    SelectorArchivoEntidadComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    EmpresasModule,
    InputsModule,
    AlertasModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class VariablesModule { }
