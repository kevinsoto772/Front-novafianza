import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-barra-porcentual',
  templateUrl: './barra-porcentual.component.html',
  styleUrls: ['./barra-porcentual.component.css']
})
export class BarraPorcentualComponent implements OnInit {
  @Input('porcentaje') porcentaje: number = 0
  constructor() { }

  ngOnInit(): void {
  }

}
