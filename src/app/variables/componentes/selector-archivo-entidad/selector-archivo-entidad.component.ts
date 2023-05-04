import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicioLocalStorage } from 'src/app/administrador/servicios/local-storage.service';
import { ArchivoEmpresa } from 'src/app/archivos/modelos/ArchivoEmpresa';
import { TipoArchivo } from 'src/app/archivos/modelos/TipoArchivo';
import { CargarArchivosService } from 'src/app/archivos/servicios/cargar-archivos.service';
import { Usuario } from 'src/app/autenticacion/modelos/IniciarSesionRespuesta';
import { Empresa } from 'src/app/empresas/modelos/Empresa';
import { EmpresasService } from 'src/app/empresas/servicios/empresas.service';

@Component({
  selector: 'app-selector-archivo-entidad',
  templateUrl: './selector-archivo-entidad.component.html',
  styleUrls: ['./selector-archivo-entidad.component.css']
})
export class SelectorArchivoEntidadComponent implements OnInit {
  @Output('seleccion')  seleccion:EventEmitter<{idEmpresa: string, idTipoArchivo: string}>;
  public empresas:Empresa[] = []
  public archivos: TipoArchivo[] = []
  public formulario: FormGroup
  public usuario: Usuario | null

  constructor(private servicioLocalStorage: ServicioLocalStorage, private servicioEmpresas:EmpresasService, private servicioArchivos: CargarArchivosService ) { 
    this.seleccion = new EventEmitter<{idEmpresa: string, idTipoArchivo: string}>();
    this.usuario = this.servicioLocalStorage.obtenerUsuario()
    this.formulario = new FormGroup({
      empresa: new FormControl<string | undefined>(undefined, [Validators.required]),
      tipoArchivo: new FormControl<string | undefined>(undefined, [Validators.required])
    })
    if(this.usuario?.idEmpresa){
      this.formulario.controls['empresa'].setValue(this.usuario.idEmpresa)
    }
  }

  ngOnInit(): void {
    this.servicioArchivos.obtenerTiposArchivo().subscribe({
      next: (respuesta => {
        this.archivos = respuesta.archivos
      })
    })

    this.servicioEmpresas.obtenerEmpresas(1, 999).subscribe({
      next: (respuesta => {
        this.empresas = respuesta.empresas
      })
    })
  }

  manejarSeleccion(){
    if(this.formulario.invalid){
      console.log(this.formulario.controls)
      throw new Error('Seleccione todos los campos correctamente')
    }
    const controls = this.formulario.controls
    this.seleccion.emit({
      idEmpresa: controls['empresa']!.value,
      idTipoArchivo: controls['tipoArchivo']!.value
    })
  }

}
