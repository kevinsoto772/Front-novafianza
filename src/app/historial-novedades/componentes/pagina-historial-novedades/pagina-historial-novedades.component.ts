import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDetallesArchivoComponent } from '../modal-detalles-archivo/modal-detalles-archivo.component';
import { ArchivoCargado } from '../../modelos/ArchivoCargado';
import { NovedadesService } from '../../servicios/novedades.service';

@Component({
  selector: 'app-pagina-historial-novedades',
  templateUrl: './pagina-historial-novedades.component.html',
  styleUrls: ['./pagina-historial-novedades.component.css']
})
export class PaginaHistorialNovedadesComponent implements OnInit {
  @ViewChild('modalVerDetalles') modalDetallesArchivo!:ModalDetallesArchivoComponent
  archivosCargados:ArchivoCargado[] = []
  constructor(private servicioNovedades: NovedadesService) { }

  ngOnInit(): void {
    this.servicioNovedades.obtenerArchivosCargados('').subscribe( respuesta => {
      this.archivosCargados = respuesta.archivosCargados
    })
    
  }

  abrirModalVerDetallesArchivo(idArchivoCargado: string){
    this.servicioNovedades.obtenerDetalleArchivo(idArchivoCargado).subscribe( detallesArchivo => {
      this.modalDetallesArchivo.abrir(detallesArchivo)
    })
  }

}
