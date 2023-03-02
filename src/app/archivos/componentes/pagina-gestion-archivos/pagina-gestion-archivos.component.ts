import { Component, OnInit, ViewChild } from '@angular/core';
import { Paginacion } from 'src/app/compartido/modelos/Paginacion';
import { ModalCrearArchivoComponent } from '../modal-crear-archivo/modal-crear-archivo.component';
import { ModalActualizarArchivoComponent } from '../modal-actualizar-archivo/modal-actualizar-archivo.component';
import { TipoArchivo } from '../../modelos/TipoArchivo';
import { CargarArchivosService } from '../../servicios/cargar-archivos.service';
import { Paginador } from 'src/app/administrador/modelos/compartido/Paginador';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pagina-gestion-archivos',
  templateUrl: './pagina-gestion-archivos.component.html',
  styleUrls: ['./pagina-gestion-archivos.component.css']
})
export class PaginaGestionArchivosComponent implements OnInit {
  @ViewChild('modalCrear') modalCrear!: ModalCrearArchivoComponent
  @ViewChild('modalActualizar') modalActualizar!: ModalActualizarArchivoComponent
  paginador: Paginador;
  archivos: TipoArchivo[] = []

  constructor(private servicioArchivos: CargarArchivosService) { 
    this.paginador = new Paginador(this.obtenerTiposArchivo)
  }

  ngOnInit(): void {
    this.paginador.inicializarPaginacion()
  }

  obtenerTiposArchivo = (pagina:number, limite: number) =>{
    return new Observable<Paginacion>( subscriptor => {
      this.servicioArchivos.obtenerTiposArchivoPaginado(pagina, limite).subscribe({
        next: ( respuesta ) => {
          this.archivos = respuesta.archivos
        } 
      })
    })
  }

  abrirModalCrear(){
    this.modalCrear.abrir()
  }

  abrirModalActualizar(){
    this.modalActualizar.abrir()
  }
}
