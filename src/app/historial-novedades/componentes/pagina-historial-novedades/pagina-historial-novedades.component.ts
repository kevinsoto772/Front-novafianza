import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDetallesArchivoComponent } from '../modal-detalles-archivo/modal-detalles-archivo.component';
import { ArchivoCargado } from '../../modelos/ArchivoCargado';
import { NovedadesService } from '../../servicios/novedades.service';
import { Paginador } from 'src/app/administrador/modelos/compartido/Paginador';
import { Observable } from 'rxjs';
import { Paginacion } from 'src/app/compartido/modelos/Paginacion';
import { ServicioLocalStorage } from 'src/app/administrador/servicios/local-storage.service';
import { Usuario } from 'src/app/autenticacion/modelos/IniciarSesionRespuesta';
import { formatearFechaIso } from 'src/app/compartido/Fechas';

@Component({
  selector: 'app-pagina-historial-novedades',
  templateUrl: './pagina-historial-novedades.component.html',
  styleUrls: ['./pagina-historial-novedades.component.css']
})
export class PaginaHistorialNovedadesComponent implements OnInit {
  @ViewChild('modalVerDetalles') modalDetallesArchivo!:ModalDetallesArchivoComponent
  archivosCargados:ArchivoCargado[] = []
  paginador: Paginador
  usuario: Usuario | null
  idEmpresa?: string
  cargandoDetalles: boolean = false
  constructor(private servicioNovedades: NovedadesService, private servicioLocalStorage: ServicioLocalStorage) { 
    this.paginador = new Paginador(this.obtenerArchivosCargados)
    this.usuario = this.servicioLocalStorage.obtenerUsuario()
    if(this.usuario && this.usuario.idEmpresa){
      this.idEmpresa = this.usuario.idEmpresa
    }
  }

  ngOnInit(): void {
    if(this.idEmpresa){
      this.paginador.inicializarPaginacion(undefined, undefined, this.idEmpresa)
    }
  }

  abrirModalVerDetallesArchivo(idArchivoCargado: string){
    this.cargandoDetalles = true
    this.servicioNovedades.obtenerDetalleArchivo(idArchivoCargado).subscribe( detallesArchivo => {
      this.cargandoDetalles = false
      this.modalDetallesArchivo.abrir(detallesArchivo, idArchivoCargado)
    })
  }

  obtenerArchivosCargados = (pagina: number, limite: number, idEmpresa: string):Observable<Paginacion> => {
    return new Observable<Paginacion>((subsciptor => {
      this.servicioNovedades.obtenerArchivosCargados(pagina, limite, idEmpresa).subscribe( respuesta => {
        this.archivosCargados = respuesta.archivosCargados
        subsciptor.next( respuesta.paginacion )
      })
    })) 
  }

  manejarCambioDeEmpresa(idEmpresa: string){
    this.idEmpresa = idEmpresa
    this.paginador.inicializarPaginacion(this.paginador.paginaActual, this.paginador.limiteRegistros, idEmpresa)

  }

  formatearFecha(fecha: string){
    return formatearFechaIso(fecha, 'yyyy-MM-dd HH:mm:ss')
  }

}
