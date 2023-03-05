import { Component, Input, OnInit } from '@angular/core';
import { Registro } from '../../modelos/NovedadesArchivo';

@Component({
  selector: 'app-tabla-novedades',
  templateUrl: './tabla-novedades.component.html',
  styleUrls: ['./tabla-novedades.component.css']
})
export class TablaNovedadesComponent implements OnInit {
  @Input('registros') registros: Registro[] = []
  
  constructor() { 
  } 

  ngOnInit(): void {
  }

}
