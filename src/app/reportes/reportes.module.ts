import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginaReportesComponent } from './componentes/pagina-reportes/pagina-reportes.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GraficoBarrasComponent } from './componentes/grafico-barras/grafico-barras.component';
import { RouterModule } from '@angular/router';
import { PaginaReporteColocacionComponent } from './componentes/tipos-reportes/pagina-reporte-colocacion/pagina-reporte-colocacion.component';
import { PaginaReporteSaldosCarteraComponent } from './componentes/tipos-reportes/pagina-reporte-saldos-cartera/pagina-reporte-saldos-cartera.component';
import { PaginaReporteOperacionesComponent } from './componentes/tipos-reportes/pagina-reporte-operaciones/pagina-reporte-operaciones.component';
import { FiltrosColocacionComponent } from './componentes/filtros/filtros-colocacion/filtros-colocacion.component';



@NgModule({
  declarations: [
    PaginaReportesComponent,
    GraficoBarrasComponent,
    PaginaReporteColocacionComponent,
    PaginaReporteSaldosCarteraComponent,
    PaginaReporteOperacionesComponent,
    FiltrosColocacionComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ReportesModule { }
