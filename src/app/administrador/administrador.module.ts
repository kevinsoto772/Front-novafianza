import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministradorRoutingModule } from './administrador-routing.module';
import { PlantillaComponent } from './componentes/plantilla/plantilla.component';
import { MenuLateralComponent } from './componentes/menu-lateral/menu-lateral.component';
import { BarraNavegacionComponent } from './componentes/barra-navegacion/barra-navegacion.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PopupComponent } from './componentes/popup/popup.component';
import { ResumenTraficoClientesComponent } from './componentes/paginas/resumen-trafico-clientes/resumen-trafico-clientes.component';
import { TraficoClientesComponent } from './componentes/paginas/trafico-clientes/trafico-clientes.component';
import { GestionDeEmpresasComponent } from './componentes/paginas/gestion-de-empresas/gestion-de-empresas.component';
import { ModalVerEmpresaComponent } from './componentes/paginas/gestion-de-empresas/modal-ver-empresa/modal-ver-empresa.component';
import { ModalRegistrarEmpresaComponent } from './componentes/paginas/gestion-de-empresas/modal-registrar-empresa/modal-registrar-empresa.component';
import { ModalActualizarEmpresaComponent } from './componentes/paginas/gestion-de-empresas/modal-actualizar-empresa/modal-actualizar-empresa.component';



@NgModule({
  declarations: [
    PlantillaComponent,
    MenuLateralComponent,
    BarraNavegacionComponent,
    PopupComponent,
    ResumenTraficoClientesComponent,
    TraficoClientesComponent,
    GestionDeEmpresasComponent,
    ModalRegistrarEmpresaComponent,
    ModalVerEmpresaComponent,
    ModalActualizarEmpresaComponent,
  ],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    SweetAlert2Module.forRoot()
  ]
})
export class AdministradorModule { }
