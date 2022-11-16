import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InicioSesionComponent } from './componentes/inicio-sesion/inicio-sesion.component';
import { HttpClientModule } from '@angular/common/http'
import { NgxCaptchaModule } from 'ngx-captcha';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalRecuperacionContrasenaComponent } from './componentes/modal-recuperacion-contrasena/modal-recuperacion-contrasena.component';


@NgModule({
  declarations: [
    InicioSesionComponent,
    ModalRecuperacionContrasenaComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxCaptchaModule,
    NgbModule
  ]
})
export class AutenticacionModule { }
