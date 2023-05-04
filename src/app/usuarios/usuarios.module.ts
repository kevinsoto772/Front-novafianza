import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ModalVerUsuarioComponent } from './componentes/gestion-de-usuarios-empresas/modal-ver-usuario/modal-ver-usuario.component';
import { ModalRegistrarUsuarioComponent } from './componentes/gestion-de-usuarios-empresas/modal-registrar-usuario/modal-registrar-usuario.component';
import { ModalActualizarUsuarioComponent } from './componentes/gestion-de-usuarios-empresas/modal-actualizar-usuario/modal-actualizar-usuario.component';
import { GestionDeUsuariosComponent } from './componentes/gestion-de-usuarios-empresas/gestion-de-usuarios.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { EmpresasModule } from '../empresas/empresas.module';
import { AlertasModule } from '../alertas/alertas.module';
import { InputsModule } from '../inputs/inputs.module';


@NgModule({
  declarations: [
    GestionDeUsuariosComponent,
    ModalRegistrarUsuarioComponent,
    ModalVerUsuarioComponent,
    ModalActualizarUsuarioComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    SweetAlert2Module.forRoot(),
    EmpresasModule,
    AlertasModule,
    InputsModule
  ]
})
export class UsuariosModule { }
