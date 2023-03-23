import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginaReportesComponent } from './componentes/pagina-reportes/pagina-reportes.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GraficoBarrasComponent } from './componentes/grafico-barras/grafico-barras.component';



@NgModule({
  declarations: [
    PaginaReportesComponent,
    GraficoBarrasComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ReportesModule { }
