import { Component, Input, OnInit } from '@angular/core';
import { NovedadesArchivo } from '../../modelos/NovedadesArchivo';

@Component({
  selector: 'app-informacion-archivo',
  templateUrl: './informacion-archivo.component.html',
  styleUrls: ['./informacion-archivo.component.css']
})
export class InformacionArchivoComponent implements OnInit {
  @Input('detallesArchivo') detallesArchivo?: NovedadesArchivo
  totalRegistrosValidacionEstructura = 0;
  totalRegistrosValidacionDatos = 0;

  constructor() { }

  ngOnInit(): void {
    this.detallesArchivo!.validaciones.forEach(validacion => {
      if (validacion.nombre === 'Validacion de datos') {
        validacion.novedades.forEach(novedad => {
          novedad.categorias.forEach(categoria => {
            this.totalRegistrosValidacionDatos+= categoria.registros.length
          })
        })
      }
    })
  }

}
