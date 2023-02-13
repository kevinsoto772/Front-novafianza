import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorEmpresaComponent } from './componentes/selector-empresa/selector-empresa.component';

@NgModule({
  declarations: [
    SelectorEmpresaComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SelectorEmpresaComponent
  ]
})
export class EmpresasModule { }
