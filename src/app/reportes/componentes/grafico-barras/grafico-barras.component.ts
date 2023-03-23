import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-grafico-barras',
  templateUrl: './grafico-barras.component.html',
  styleUrls: ['./grafico-barras.component.css']
})
export class GraficoBarrasComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas') canvas!: ElementRef
  public grafico?: Chart
  labels: string[] = []
  data: number[] = []
  public coloresGrafico: string[] = ['#4E73DF', '#36B9CC', '#1CC88A']

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.data = [100, 200, 300]
    this.labels = ['Archivo1', 'Archivo2', 'Archivo3']
    this.renderizarGrafico(this.labels, this.data)
  }

  public renderizarGrafico(labels: string[], data: number[]) {
    this.grafico = new Chart(this.canvas.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: this.obtenerColoresDeBarras(this.labels, this.coloresGrafico)
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          xAxis: {
            grid: {
              display: false
            }
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
