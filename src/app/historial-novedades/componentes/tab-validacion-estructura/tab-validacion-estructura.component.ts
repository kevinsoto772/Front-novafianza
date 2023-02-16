import { Component, Input, OnInit } from '@angular/core';
import { Validacion } from '../../modelos/NovedadesArchivo';

@Component({
  selector: 'app-tab-validacion',
  templateUrl: './tab-validacion-estructura.component.html',
  styleUrls: ['./tab-validacion-estructura.component.css']
})
export class TabValidacion implements OnInit {
  @Input('validacion') validacion!:Validacion
  constructor() { }

  ngOnInit(): void {
  }

}
