import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDetallesArchivoComponent } from '../modal-detalles-archivo/modal-detalles-archivo.component';
import { ArchivoCargado } from '../../modelos/ArchivoCargado';
import { NovedadesService } from '../../servicios/novedades.service';
import { Paginador } from 'src/app/administrador/modelos/compartido/Paginador';
import { Observable } from 'rxjs';
import { Paginacion } from 'src/app/compartido/modelos/Paginacion';

@Component({
  selector: 'app-pagina-historial-novedades',
  templateUrl: './pagina-historial-novedades.component.html',
  styleUrls: ['./pagina-historial-novedades.component.css']
})
export class PaginaHistorialNovedadesComponent implements OnInit {
  @ViewChild('modalVerDetalles') modalDetallesArchivo!:ModalDetallesArchivoComponent
  archivosCargados:ArchivoCargado[] = []
  paginador: Paginador
  constructor(private servicioNovedades: NovedadesService) { 
    this.paginador = new Paginador(this.obtenerArchivosCargados)
  }

  ngOnInit(): void {
    this.paginador.inicializarPaginacion()
  }

  abrirModalVerDetallesArchivo(idArchivoCargado: string){
    this.servicioNovedades.obtenerDetalleArchivo(idArchivoCargado).subscribe( detallesArchivo => {
      this.modalDetallesArchivo.abrir(detallesArchivo)
    })
  }

  obtenerArchivosCargados = (pagina: number, limite: number, idEmpresa: string):Observable<Paginacion> => {
    return new Observable<Paginacion>((subsciptor => {
      this.servicioNovedades.obtenerArchivosCargados(pagina, limite).subscribe( respuesta => {
        this.archivosCargados = respuesta.archivosCargados
        subsciptor.next( respuesta.paginacion )
      })
    })) 
  }

}
