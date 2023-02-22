import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpresasService } from '../../servicios/empresas.service';
import { Empresa } from '../../modelos/Empresa';
import { ModalCrearEmpresaComponent } from '../modal-crear-empresa/modal-crear-empresa.component';
import { ModalActualizarEmpresaComponent } from '../modal-actualizar-empresa/modal-actualizar-empresa.component';
import { Paginacion } from 'src/app/compartido/modelos/Paginacion';
import { ModalAsignarServiciosComponent } from '../modal-asignar-servicios/modal-asignar-servicios.component';

@Component({
  selector: 'app-pagina-administrar-empresas',
  templateUrl: './pagina-administrar-empresas.component.html',
  styleUrls: ['./pagina-administrar-empresas.component.css']
})
export class PaginaAdministrarEmpresasComponent implements OnInit {
  @ViewChild('modalCrearEmpresa') modalCrearEmpresa!: ModalCrearEmpresaComponent
  @ViewChild('modalActualizarEmpresa') modalActualizar!: ModalActualizarEmpresaComponent
  @ViewChild('modalAsignarServicios') modalAsignarServicios!: ModalAsignarServiciosComponent
  public empresas: Empresa[] = []
  public paginacion: Paginacion

  constructor(private servicioEmpresas: EmpresasService) {
    this.paginacion = {
      paginaActual: 1,
      totalPaginas: 1,
      totalRegistros: 5
    }
  }

  ngOnInit(): void {
    this.obtenerEmpresas(1, 100)
  }

  cambiarEstadoEmpresa(empresa: Empresa){
    empresa.estado = !empresa.estado
    this.servicioEmpresas.cambiarEstadoEmpresa(empresa.id!).subscribe({
      complete: ()=> {  },
      error: ()=> { }
    })
  }

  obtenerEmpresas(pagina: number, limite: number) {
    this.servicioEmpresas.obtenerEmpresas(pagina, limite).subscribe(respuesta => {
      this.empresas = respuesta.empresas
      this.paginacion = respuesta.paginacion
    })
  }

  abrirModalCrearEmpresa() {
    this.modalCrearEmpresa.abrir()
  }

  abrirModalAsignarServicios() {
    this.modalAsignarServicios.abrir()
  }

  abrirModalActualizarEmpresa(empresa: Empresa) {
    this.modalActualizar.abrir(empresa)
  }

}
