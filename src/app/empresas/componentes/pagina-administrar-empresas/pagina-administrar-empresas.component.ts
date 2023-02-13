import { Component, OnInit } from '@angular/core';
import { EmpresasService } from '../../servicios/empresas.service';
import { Empresa } from '../../modelos/Empresa';

@Component({
  selector: 'app-pagina-administrar-empresas',
  templateUrl: './pagina-administrar-empresas.component.html',
  styleUrls: ['./pagina-administrar-empresas.component.css']
})
export class PaginaAdministrarEmpresasComponent implements OnInit {
  public empresas:Empresa[] = []

  constructor(private servicioEmpresas: EmpresasService) { }

  ngOnInit(): void {
    this.servicioEmpresas.obtenerEmpresas().subscribe(respuesta => {
      this.empresas = respuesta.empresas;
    })
  }

}
