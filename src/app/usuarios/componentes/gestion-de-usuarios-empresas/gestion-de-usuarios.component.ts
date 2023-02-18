import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Empresa } from 'src/app/administrador/modelos/empresas/Empresa';
import { ServicioEmpresa } from 'src/app/administrador/servicios/empresas.service';
import { PopupComponent } from '../../popup/popup.component';
import { ModalRegistrarUsuarioComponent } from './modal-registrar-usuario/modal-registrar-usuario.component';
import { ModalVerUsuarioComponent } from './modal-ver-usuario/modal-ver-usuario.component';
import { ModalActualizarUsuarioComponent } from './modal-actualizar-usuario/modal-actualizar-usuario.component';
import { ServicioCabeceraService } from 'src/app/administrador/servicios/servicio-cabecera.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicioUsuarios } from 'src/app/administrador/servicios/usuarios.service';
import { Usuario } from 'src/app/autenticacion/modelos/IniciarSesionRespuesta';
import { UsuarioEmpresa } from 'src/app/administrador/modelos/usuarios/usuarioEmpresa';

@Component({
  selector: 'app-gestion-de-usuarios',
  templateUrl: './gestion-de-usuarios.component.html',
  styleUrls: ['./gestion-de-usuarios.component.css']
})
export class GestionDeUsuariosComponent implements OnInit {
  @ViewChild('popup') popup!: PopupComponent
  @ViewChild('modalRegistrarUsuario') modalRegistrarUsuario!: ModalRegistrarUsuarioComponent
  @ViewChild('modalverUsuario') ModalVerUsuarioComponent!: ModalVerUsuarioComponent
  @ViewChild('modalActualizarUsuario') modalActualizarUsuarioEmpresa!: ModalActualizarUsuarioComponent
  public formulario: FormGroup
  public ReportesCabecera = ['Crear usuarios', '/assets/img/agregar-usuario.svg']
  public pagina = 1;
  public total = 0;
  public limite = 5;
  public usuarios: UsuarioEmpresa[] = []
  public usuarioAdministrador:Usuario
  public idEmpresa?: string

  constructor(private servicioUsuarios: ServicioUsuarios, private servicioCabercera: ServicioCabeceraService) {
    const usuarioString = localStorage.getItem('Usuario')
    if(!usuarioString){
      throw Error('No existe el usuario en el local storage, vuelva a iniciar sesión')
    }
    this.usuarioAdministrador = JSON.parse( usuarioString ) as Usuario
    if(this.usuarioAdministrador.idEmpresa){
      this.idEmpresa = this.usuarioAdministrador.idEmpresa
    }
    this.servicioCabercera.actualizarTitulo(this.ReportesCabecera)
    this.formulario = new FormGroup({
      busqueda: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.obtenerUsuariosEmpresa(1, 5, '')
  }

  buscarUsuario(cedula: string){
    this.servicioUsuarios.obtenerUsuarioEmpresaPorUsuario(cedula).subscribe( respuesta => {})
  }

  obtenerUsuariosEmpresa(pagina: number, limite: number, idEmpresa: string) {
    this.servicioUsuarios.obtenerUsuariosEmpresa(pagina, limite).subscribe(respuesta => {
      this.usuarios = respuesta.usuariosEmpresa;
    })
  }

  cambioDePagina(pagina: number): void {

  }

  cambiarlimitePaginado(porPagina: string) {
    const NumeroEmpresasEnPagina = parseInt(porPagina)
    this.limite = NumeroEmpresasEnPagina;
    this.refrescarListaDeUsuarios();
  }

  abrirModalRegistrarUsuario(): void {
    console.log(this.usuarioAdministrador)
    console.log(this.idEmpresa)
    if(!this.idEmpresa){
      throw Error('Para abrir el modal de registro de usuario debe haber una empresa seleccionada')
    }
    this.modalRegistrarUsuario.abrir(this.idEmpresa);
  }

  abrirModalVer(empresa: Empresa): void {
    this.ModalVerUsuarioComponent.abrir(empresa);
  }

  abrirModalActualizarUsuarioEmpresa(usuario: UsuarioEmpresa): void {
    this.modalActualizarUsuarioEmpresa.abrir(usuario);
  }

  public refrescarListaDeUsuarios(): void {
    this.obtenerUsuariosEmpresa(this.pagina, this.limite, '')
  }
}
