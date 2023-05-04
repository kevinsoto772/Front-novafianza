import { Component, Input, OnInit } from '@angular/core';
import { NovedadesArchivo } from '../../modelos/NovedadesArchivo';
import { DateTime } from 'luxon';
import { formatearFechaIso } from 'src/app/compartido/Fechas';
import { NovedadesService } from '../../servicios/novedades.service';

@Component({
  selector: 'app-informacion-archivo',
  templateUrl: './informacion-archivo.component.html',
  styleUrls: ['./informacion-archivo.component.css']
})
export class InformacionArchivoComponent implements OnInit {
  @Input('detallesArchivo') detallesArchivo?: NovedadesArchivo
  @Input('idArchivoCargado') idArchivoCargado?: string
  totalRegistrosValidacionEstructura = 0;
  totalRegistrosValidacionDatos = 0;
  descargandoArchivo = false

  constructor(private servicioNovedades: NovedadesService) { }

  ngOnInit(): void {
    this.detallesArchivo!.validaciones.forEach(validacion => {
      if (validacion.nombre === 'Validacion de datos') {
        validacion.novedades.forEach(novedad => {
          novedad.categorias.forEach(categoria => {
            this.totalRegistrosValidacionDatos+= categoria.registros.length
          })
        })
      }

      if (validacion.nombre === 'Validacion de estructura') {
        validacion.novedades.forEach(novedad => {
          novedad.categorias.forEach(categoria => {
            this.totalRegistrosValidacionEstructura+= categoria.registros.length
          })
        })
      }
    })
  }

  descargarReporte(){
    this.descargandoArchivo = true
    this.servicioNovedades.descargarDetalleArchivo(this.idArchivoCargado!).subscribe({
      next: (data)=>{
        this.descargandoArchivo = false
        const downloadURL = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = 'reporte.xlsx';
        link.click();
      }
    })
  }

  formatearFecha(fecha:string){
    return formatearFechaIso(fecha, 'yyyy-MM-dd HH:mm:ss')
  }

}
