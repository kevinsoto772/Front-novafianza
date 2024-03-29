import { Component, OnInit, ViewChild } from '@angular/core';
import { Empresa } from 'src/app/administrador/modelos/empresas/Empresa';
import { PopupComponent } from 'src/app/alertas/componentes/popup/popup.component';
import { ModalRegistrarUsuarioComponent } from './modal-registrar-usuario/modal-registrar-usuario.component';
import { ModalVerUsuarioComponent } from './modal-ver-usuario/modal-ver-usuario.component';
import { ModalActualizarUsuarioComponent } from './modal-actualizar-usuario/modal-actualizar-usuario.component';
import { ServicioCabeceraService } from 'src/app/administrador/servicios/servicio-cabecera.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicioUsuarios } from 'src/app/administrador/servicios/usuarios.service';
import { Usuario } from 'src/app/autenticacion/modelos/IniciarSesionRespuesta';
import { UsuarioEmpresa } from 'src/app/administrador/modelos/usuarios/usuarioEmpresa';
import { Paginacion } from 'src/app/compartido/modelos/Paginacion';
import { Paginador } from 'src/app/administrador/modelos/compartido/Paginador';
import { Observable } from 'rxjs';
import { ServicioLocalStorage } from 'src/app/administrador/servicios/local-storage.service';
import { formatearFechaIso } from 'src/app/compartido/Fechas';

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
  public ReportesCabecera = ['Crear usuarios', 'assets/img/agregar-usuario.svg']
  public paginador: Paginador;
  public usuario: Usuario | null;
  public usuarios: UsuarioEmpresa[] = []
  public usuarioAdministrador:Usuario
  public idEmpresa?: string

  constructor(private servicioUsuarios: ServicioUsuarios, private servicioCabercera: ServicioCabeceraService, private servicioLocalStorage: ServicioLocalStorage) {
    this.paginador = new Paginador(this.obtenerUsuariosEmpresa)
    this.usuario = servicioLocalStorage.obtenerUsuario()
    const usuarioString = localStorage.getItem('Usuario')
    if(!usuarioString){
      throw Error('No existe el usuario en el local storage, vuelva a iniciar sesión')
    }
    this.usuarioAdministrador = JSON.parse( usuarioString ) as Usuario
    if(this.usuario && this.usuario.idEmpresa){
      this.idEmpresa = this.usuario.idEmpresa
    }
    this.servicioCabercera.actualizarTitulo(this.ReportesCabecera)
    this.formulario = new FormGroup({
      busqueda: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    if(this.idEmpresa){
      this.paginador.inicializarPaginacion(undefined, undefined, this.idEmpresa)
    }
  }

  manejarCambioDeEmpresa(idEmpresa: string){
    this.idEmpresa = idEmpresa;
    this.paginador.inicializarPaginacion(this.paginador.paginaActual, this.paginador.limiteRegistros, this.idEmpresa)
  }

  buscarUsuario(cedula: string){
    this.servicioUsuarios.obtenerUsuarioEmpresaPorUsuario(cedula).subscribe( respuesta => {})
  }

  obtenerUsuariosEmpresa = (pagina: number, limite: number, idEmpresa: string):Observable<Paginacion> => {
    const observable = new Observable<Paginacion>((subscriptor => {
      this.servicioUsuarios.obtenerUsuariosEmpresaPorEmpresa(pagina, limite, idEmpresa).subscribe(respuesta => {
        this.usuarios = respuesta.usuariosEmpresa;
        subscriptor.next(respuesta.paginacion)
      })
    }))
    return observable
  }

  cambiarEstadoUsuario(idUsuario: string){
    this.servicioUsuarios.cambiarEstadoUsuarioEmpresa(idUsuario).subscribe({
      next: ()=> this.popup.abrirPopupExitoso('Se actualizó el estado del usuario.'),
      error: ()=> this.popup.abrirPopupExitoso('Se actualizó el estado del usuario.'),
    })
  }

  abrirModalRegistrarUsuario(): void {
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

  formatearFecha(fecha:string){
    return formatearFechaIso(fecha, 'yyyy-MM-dd')
  }
}
