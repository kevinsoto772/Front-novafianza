import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Empresa } from 'src/app/administrador/modelos/empresas/Empresa';
import { ServicioEmpresa } from 'src/app/administrador/servicios/empresas.service';
import { PopupComponent } from '../../popup/popup.component';
import {ModalRegistrarUsuarioComponent } from './modal-registrar-usuario/modal-registrar-usuario.component';
import { ModalVerUsuarioComponent } from './modal-ver-usuario/modal-ver-usuario.component';
import { ModalActualizarUsuarioComponent } from './modal-actualizar-usuario/modal-actualizar-empresa.component';
import { ServicioCabeceraService } from 'src/app/administrador/servicios/servicio-cabecera.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-gestion-de-usuarios',
  templateUrl: './gestion-de-usuarios.component.html',
  styleUrls: ['./gestion-de-usuarios.component.css']
})
export class GestionDeUsuariosComponent implements OnInit {
  @ViewChild('popup') popup!: PopupComponent
  @ViewChild('modalRegistrarUsuario') modalRegistrarUsuario!: ModalRegistrarUsuarioComponent
  @ViewChild('modalverUsuario') ModalVerUsuarioComponent!: ModalVerUsuarioComponent
  @ViewChild('modalActualizarUsuario') ModalActualizarEmpresaComponent!: ModalActualizarUsuarioComponent
  public formulario: FormGroup
  public ReportesCabecera = ['Crear usuarios','/assets/img/agregar-usuario.svg']
  public pagina = 1;
  public total = 0;
  public limite = 5;

  public empresas: Empresa[] = [];

  constructor(private servicioEmpresa: ServicioEmpresa, private servicioCabercera: ServicioCabeceraService) {
    this.servicioCabercera.actualizarTitulo(this.ReportesCabecera)
    this.formulario = new FormGroup({
      busqueda: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    this.servicioEmpresa.obtenerEmpresas(this.pagina, this.limite).subscribe((empresas) => {
      this.empresas = empresas.empresas
      this.total = empresas.paginacion.totalRegistros
    });
  }

  public cambiarEstadoEmpresa(indexEmpresa:number):void{
    console.log('cambiando estado empresa', indexEmpresa)
    this.servicioEmpresa.cambiarEstadoEmpresa(this.empresas[indexEmpresa].id).subscribe((respuesta: any) => {
      this.empresas[indexEmpresa].estado = !this.empresas[indexEmpresa].estado
      this.refrescarListaDeEmpresas();
      this.popup.abrirPopupExitoso('Actualizado con éxito', undefined, undefined)
    }, (error: HttpErrorResponse) => {
      const mensaje = error.error.mensaje ? error.error.mensaje : 'No se pudo actualizar el estado de la empresa'
    });
  }

  public cambioDePagina(pagina: number): void{
    this.servicioEmpresa.obtenerEmpresas(pagina, this.limite).subscribe((empresas) => {
      this.empresas = empresas.empresas;
      this.total = empresas.paginacion.totalRegistros;
    });
  }

  public cambiarlimitePaginado(porPagina:string){
    const NumeroEmpresasEnPagina = parseInt(porPagina)
    this.limite = NumeroEmpresasEnPagina;
    this.refrescarListaDeEmpresas();
  }

  public abrirModalRegistrarEmpresa(): void {
    this.modalRegistrarUsuario.abrir();
    }

    public abrirModalVer(empresa: Empresa): void{
      this.ModalVerUsuarioComponent.abrir(empresa);
    }

    public abrirModalActualizar(empresa: Empresa): void{
      this.ModalActualizarEmpresaComponent.abrir(empresa);
    }

  public refrescarListaDeEmpresas():void{
    this.servicioEmpresa.obtenerEmpresas(this.pagina, this.limite).subscribe((empresas) => {
      this.empresas = empresas.empresas;
      this.total = empresas.paginacion.totalRegistros;
        });
  }
}
