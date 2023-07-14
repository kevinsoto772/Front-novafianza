import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicioCabeceraService } from 'src/app/administrador/servicios/servicio-cabecera.service';
import { CargarArchivosService } from '../../servicios/cargar-archivos.service';
import { PopupProcesandoComponent } from '../popup-procesando/popup-procesando.component';
import { marcarFormularioComoSucio } from 'src/app/administrador/utilidades/Utilidades';
import { TipoArchivo } from '../../modelos/TipoArchivo';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ServicioLocalStorage } from 'src/app/administrador/servicios/local-storage.service';

@Component({
  selector: 'app-pagina-carga-archivos',
  templateUrl: './pagina-carga-archivos.component.html',
  styleUrls: ['./pagina-carga-archivos.component.css']
})
export class PaginaCargaArchivosComponent implements OnInit {
  @ViewChild('popupProcesando') popupProcesando!: PopupProcesandoComponent
  public archivosCabecera = ['Carga de archivos', 'assets/img/icono-archivos-blanco.svg']
  public formulario: FormGroup
  public formatoInvalido: boolean = false
  public tiposArchivo: TipoArchivo[] = []
  public idEmpresa?: string

  constructor(
    private servicioCabercera: ServicioCabeceraService, 
    private servicioArchivo: CargarArchivosService,
    private servicioLocalStorage: ServicioLocalStorage,
    private router: Router) {
    const usuario = this.servicioLocalStorage.obtenerUsuario()
    if(usuario!.idEmpresa){
      this.idEmpresa = usuario!.idEmpresa
    }
    this.servicioCabercera.actualizarTitulo(this.archivosCabecera)
    this.formulario = new FormGroup({
      tipoArchivo: new FormControl('', [Validators.required]),
      fechaInicial: new FormControl('', [Validators.required]),
      fechaFinal: new FormControl('', [Validators.required]),
      archivo: new FormControl<File | null>(null, [Validators.required]),
      anio: new FormControl<number | undefined>(undefined, [Validators.required, Validators.pattern(/^\d{4}$/)]),
      mes: new FormControl<number | undefined>(undefined, [Validators.required])
    })
  }

  ngOnInit(): void {
    this.obtenerTiposArchivo()
  }

  public obtenerTiposArchivo(){
    this.servicioArchivo.obtenerTiposArchivoPorEmpresa(this.idEmpresa!).subscribe({
      next: (respuesta) => {
        this.tiposArchivo = respuesta.archivos
      }
    })
  }

  public abrirPopupProcesando(){
    this.popupProcesando.abrir()
  }

  public enviarArchivo(esPrueba: boolean):void{
    if(this.formulario.invalid){
      marcarFormularioComoSucio(this.formulario)
      console.log(this.formulario.controls)
      throw Error('Formulario inválido');
    }
    const controls = this.formulario.controls
    this.servicioArchivo.cargarArchivo(
      controls['archivo'].value,
      {
        fechaInicial: controls['fechaInicial'].value,
        fechaFinal: controls['fechaFinal'].value
      },
      controls['tipoArchivo'].value,
      controls['anio'].value,
      controls['mes'].value,
      esPrueba
    ).subscribe({
      next: () => {
        this.abrirPopupProcesando()
      },
      error: (error: HttpErrorResponse) => {
        if(error.status === 415){
          this.formatoInvalido = true;
        }else{ }
      }
    })
  }

  public cargarOtroArchivo(){
    this.formatoInvalido = false
    this.formulario.reset()
  }

  public verHistorialDeNovedades(){
    this.router.navigateByUrl('/administrar/historial_novedades')
  }
}
