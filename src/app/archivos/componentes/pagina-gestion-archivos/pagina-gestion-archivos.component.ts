import { Component, OnInit, ViewChild } from '@angular/core';
import { Paginacion } from 'src/app/compartido/modelos/Paginacion';
import { ModalCrearArchivoComponent } from '../modal-crear-archivo/modal-crear-archivo.component';
import { ModalActualizarArchivoComponent } from '../modal-actualizar-archivo/modal-actualizar-archivo.component';
import { TipoArchivo } from '../../modelos/TipoArchivo';
import { CargarArchivosService } from '../../servicios/cargar-archivos.service';

@Component({
  selector: 'app-pagina-gestion-archivos',
  templateUrl: './pagina-gestion-archivos.component.html',
  styleUrls: ['./pagina-gestion-archivos.component.css']
})
export class PaginaGestionArchivosComponent implements OnInit {
  @ViewChild('modalCrear') modalCrear!: ModalCrearArchivoComponent
  @ViewChild('modalActualizar') modalActualizar!: ModalActualizarArchivoComponent
  paginacion: Paginacion
  archivos: TipoArchivo[] = []

  constructor(private servicioArchivos: CargarArchivosService) { 
    this.paginacion = {
      paginaActual: 1,
      totalPaginas: 2,
      totalRegistros: 10
    }
  }

  ngOnInit(): void {
    this.servicioArchivos.obtenerTiposArchivo().subscribe({
      next: ( respuesta ) => {
        this.archivos = respuesta.archivos
      } 
    })
  }

  cambioDePagina(pagina: number){
  }

  abrirModalCrear(){
    this.modalCrear.abrir()
  }

  abrirModalActualizar(){
    this.modalActualizar.abrir()
  }
}
