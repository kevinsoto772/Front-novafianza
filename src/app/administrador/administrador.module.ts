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
import { ModalVerUsuarioComponent } from './componentes/paginas/gestion-de-usuarios-empresas/modal-ver-usuario/modal-ver-usuario.component';
import { ModalRegistrarUsuarioComponent } from './componentes/paginas/gestion-de-usuarios-empresas/modal-registrar-usuario/modal-registrar-usuario.component';
import { ModalActualizarUsuarioComponent } from './componentes/paginas/gestion-de-usuarios-empresas/modal-actualizar-usuario/modal-actualizar-empresa.component';
import { HistorialNovedadesComponent } from './componentes/paginas/historial-novedades/historial-novedades.component';
import { CargaArchivosComponent } from './componentes/paginas/carga-archivos/carga-archivos.component';
import { ReportesComponent } from './componentes/paginas/reportes/reportes.component';
import { ConfiguracionDeCuentaComponent } from './componentes/paginas/configuracion-de-cuenta/configuracion-de-cuenta.component';
import { GestionDeUsuariosComponent } from './componentes/paginas/gestion-de-usuarios-empresas/gestion-de-usuarios.component';



@NgModule({
  declarations: [
    PlantillaComponent,
    MenuLateralComponent,
    BarraNavegacionComponent,
    PopupComponent,
    GestionDeUsuariosComponent,
    ModalRegistrarUsuarioComponent,
    ModalVerUsuarioComponent,
    ModalActualizarUsuarioComponent,
    HistorialNovedadesComponent,
    CargaArchivosComponent,
    ReportesComponent,
    ConfiguracionDeCuentaComponent,
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
