import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Empresa } from 'src/app/administrador/modelos/empresas/Empresa';
import { ServicioEmpresa } from 'src/app/administrador/servicios/empresas.service';
import { PopupComponent } from '../../popup/popup.component';
import { ModalRegistrarEmpresaComponent } from './modal-registrar-empresa/modal-registrar-empresa.component';
import { ModalVerEmpresaComponent } from './modal-ver-empresa/modal-ver-empresa.component';
import { ModalActualizarEmpresaComponent } from './modal-actualizar-empresa/modal-actualizar-empresa.component';
import { ServicioCabeceraService } from 'src/app/administrador/servicios/servicio-cabecera.service';

@Component({
  selector: 'app-gestion-de-empresas',
  templateUrl: './gestion-de-empresas.component.html',
  styleUrls: ['./gestion-de-empresas.component.css']
})
export class GestionDeEmpresasComponent implements OnInit {
  @ViewChild('popup') popup!: PopupComponent
  @ViewChild('modalRegistrarEmpresa') ModalRegistrarEmpresa!: ModalRegistrarEmpresaComponent
  @ViewChild('modalverEmpresa') ModalverEmpresaComponent!: ModalVerEmpresaComponent
  @ViewChild('modalActualizarEmpresa') ModalActualizarEmpresaComponent!: ModalActualizarEmpresaComponent
  public ReportesCabecera = ['Crear usuarios','/assets/img/agregar-usuario.svg']
  public pagina = 1;
  public total = 0;
  public limite = 5;

  public empresas: Empresa[] = [];
  constructor(private servicioEmpresa: ServicioEmpresa, private servicioCabercera: ServicioCabeceraService) {
    this.servicioCabercera.actualizarTitulo(this.ReportesCabecera)
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
    this.ModalRegistrarEmpresa.abrir();
    }

    public abrirModalVer(empresa: Empresa): void{
      this.ModalverEmpresaComponent.abrir(empresa);
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
