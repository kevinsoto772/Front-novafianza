import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministradorModule } from '../administrador/administrador.module';
import { PopupComponent } from '../alertas/componentes/popup/popup.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdministradorModule
  ],
  exports: [
  ]
})
export class AdministradorCompartidoModule { }
