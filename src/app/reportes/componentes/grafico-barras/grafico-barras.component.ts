import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart, { ChartTypeRegistry } from 'chart.js/auto'

@Component({
  selector: 'app-grafico-barras',
  templateUrl: './grafico-barras.component.html',
  styleUrls: ['./grafico-barras.component.css']
})
export class GraficoBarrasComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvas!: ElementRef
  public grafico?: Chart<'line'>
  labels: string[] = []
  data: number[] = []
  public coloresGrafico: string[] = ['#4E73DF', '#36B9CC', '#1CC88A']

  constructor() { 
   /*  Chart.register(CategoryScale) */
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.data = [100, 200, 300, 400 ]
    this.labels = ['Archivo1', 'Archivo2', 'Archivo3', 'Archivo4', 'Archivo5']
    this.renderizarGrafico(this.labels, this.data)
  }

  public renderizarGrafico(labels: string[], data: number[]) {
    this.grafico = new Chart<'line'>(this.canvas.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'año',          
          data: data,
          backgroundColor: this.coloresGrafico[0],
          borderColor: this.coloresGrafico[0]
        }]
      },
      options: {
        plugins: {
          legend: {

          }
        },
        scales: {
          xAxis: {
/*             grid: {
              display: false
            } */
          }
        }
      },
    })
  }

  private obtenerColoresDeBarras(labels: string[], colores: string[]): string[] {
    let coloresDeBarras: string[] = []
    let indice = 0;
    if (labels.length === 0) return [];
    for (let i = 0; i < labels.length; i++) {
      coloresDeBarras.push(colores[indice])
      indice++;
      if (indice === colores.length) indice = 0;
    }
    return coloresDeBarras;
  }

}
