import { Component, Input, OnInit } from '@angular/core';
import { Registro } from '../../modelos/NovedadesArchivo';
import { NovedadesService } from '../../servicios/novedades.service';
import { Paginador } from 'src/app/administrador/modelos/compartido/Paginador';
import { Observable } from 'rxjs';
import { Paginacion } from 'src/app/administrador/modelos/compartido/Paginacion';

@Component({
  selector: 'app-tabla-novedades',
  templateUrl: './tabla-novedades.component.html',
  styleUrls: ['./tabla-novedades.component.css']
})
export class TablaNovedadesComponent implements OnInit {
  @Input('registros') registros: Registro[] = []
  registrosPaginados: Registro[] = []
  paginador: Paginador
  
  constructor(private servicioNovedades:NovedadesService) {
    this.paginador = new Paginador(this.obtenerRegistros) 
  } 

  ngOnInit(): void {
    this.paginador.inicializarPaginacion(undefined, undefined)
  }

  obtenerRegistros = (pagina: number, limite: number): Observable<Paginacion> =>{
    return new Observable( subscriptor => {
      this.servicioNovedades.paginarRegistros( pagina, limite, this.registros ).subscribe({
        next: ( respuesta )=> {
          this.registrosPaginados = respuesta.registros
          subscriptor.next(respuesta.paginacion)
        }
      })
    })
  }

}
