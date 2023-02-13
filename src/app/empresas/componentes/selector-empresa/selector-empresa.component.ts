import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmpresasService } from '../../servicios/empresas.service';
import { Empresa } from '../../modelos/Empresa';

@Component({
  selector: 'app-selector-empresa',
  templateUrl: './selector-empresa.component.html',
  styleUrls: ['./selector-empresa.component.css']
})
export class SelectorEmpresaComponent implements OnInit{
  @Output('seleccion')  empresaSeleccionada:EventEmitter<Empresa>;
  public empresas:Empresa[] = []

  constructor(private servicioEmpresas: EmpresasService) { 
    this.empresaSeleccionada = new EventEmitter<Empresa>();
  }

  ngOnInit(): void {
    this.servicioEmpresas.obtenerEmpresas().subscribe( respuesta => {
      this.empresas = respuesta.empresas;
    }) 
  }

  manejarSeleccionEmpresa(id: string): void{
    const empresa = this.empresas.find( empresa => empresa.id === id);
    if(!empresa){
      throw Error(`No se encontró la empresa con id ${id} en el arreglo de empresas`)
    }
    this.empresaSeleccionada.emit(empresa)
    console.log(empresa)
  }

}
