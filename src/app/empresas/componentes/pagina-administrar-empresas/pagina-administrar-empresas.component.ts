import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpresasService } from '../../servicios/empresas.service';
import { Empresa } from '../../modelos/Empresa';
import { ModalCrearEmpresaComponent } from '../modal-crear-empresa/modal-crear-empresa.component';
import { ModalActualizarEmpresaComponent } from '../modal-actualizar-empresa/modal-actualizar-empresa.component';
import { Paginacion } from 'src/app/compartido/modelos/Paginacion';
import { ModalAsignarServiciosComponent } from '../modal-asignar-servicios/modal-asignar-servicios.component';
import { Paginador } from 'src/app/administrador/modelos/compartido/Paginador';
import { Observable } from 'rxjs';
import { PopupComponent } from 'src/app/alertas/componentes/popup/popup.component';
import { formatearFechaIso } from 'src/app/compartido/Fechas';

@Component({
  selector: 'app-pagina-administrar-empresas',
  templateUrl: './pagina-administrar-empresas.component.html',
  styleUrls: ['./pagina-administrar-empresas.component.css']
})
export class PaginaAdministrarEmpresasComponent implements OnInit {
  @ViewChild('modalCrearEmpresa') modalCrearEmpresa!: ModalCrearEmpresaComponent
  @ViewChild('modalActualizarEmpresa') modalActualizar!: ModalActualizarEmpresaComponent
  @ViewChild('modalAsignarServicios') modalAsignarServicios!: ModalAsignarServiciosComponent
  @ViewChild('popup') popup!: PopupComponent
  public empresas: Empresa[] = []
  public paginador: Paginador

  constructor(private servicioEmpresas: EmpresasService) {
    this.paginador = new Paginador(this.obtenerEmpresas)
  }

  ngOnInit(): void {
    this.paginador.inicializarPaginacion()
  }

  cambiarEstadoEmpresa(empresa: Empresa) {
    empresa.estado = !empresa.estado
    this.servicioEmpresas.cambiarEstadoEmpresa(empresa.id!).subscribe({
      complete: () => { this.popup.abrirPopupExitoso('Se ha cambiado el estado de la entidad.') },
      error: () => { this.popup.abrirPopupExitoso('Se ha cambiado el estado de la entidad.') },
      next: () => { this.popup.abrirPopupExitoso('Se ha cambiado el estado de la entidad.') }
    })
  }

  obtenerEmpresas = (pagina: number, limite: number): Observable<Paginacion> => {
    return new Observable<Paginacion>(subsciptor => {
      this.servicioEmpresas.obtenerEmpresas(pagina, limite).subscribe(respuesta => {
        this.empresas = respuesta.empresas
        subsciptor.next(respuesta.paginacion)
      })
    })
  }

  abrirModalCrearEmpresa() {
    this.modalCrearEmpresa.abrir()
  }

  abrirModalAsignarServicios(empresa: Empresa) {
    this.modalAsignarServicios.abrir(empresa)
  }

  abrirModalActualizarEmpresa(empresa: Empresa) {
    this.modalActualizar.abrir(empresa)
  }

  alCrearEmpresa(empresa: Empresa) {
    this.paginador.inicializarPaginacion()
    this.abrirModalAsignarServicios(empresa)
  }

  formatearFecha(fechaIso: string){
    return formatearFechaIso(fechaIso, 'dd / MM / yyyy')
  }

}
