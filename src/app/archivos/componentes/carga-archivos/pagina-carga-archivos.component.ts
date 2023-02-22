import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicioCabeceraService } from 'src/app/administrador/servicios/servicio-cabecera.service';
import { CargarArchivosService } from '../../servicios/cargar-archivos.service';
import { PopupProcesandoComponent } from '../popup-procesando/popup-procesando.component';
import { marcarFormularioComoSucio } from 'src/app/administrador/utilidades/Utilidades';
import { TipoArchivo } from '../../modelos/TipoArchivo';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-carga-archivos',
  templateUrl: './pagina-carga-archivos.component.html',
  styleUrls: ['./pagina-carga-archivos.component.css']
})
export class PaginaCargaArchivosComponent implements OnInit {
  @ViewChild('popupProcesando') popupProcesando!: PopupProcesandoComponent
  public archivosCabecera = ['Carga de archivos', '/assets/img/icono-archivos-blanco.svg']
  public formulario: FormGroup
  public formatoInvalido: boolean = false
  public tiposArchivo: TipoArchivo[] = []

  constructor(private servicioCabercera: ServicioCabeceraService, private servicioArchivo: CargarArchivosService, private router: Router) {
    this.servicioCabercera.actualizarTitulo(this.archivosCabecera)
    this.formulario = new FormGroup({
      tipoArchivo: new FormControl('', [Validators.required]),
      fechaInicial: new FormControl('', [Validators.required]),
      fechaFinal: new FormControl('', Validators.required),
      archivo: new FormControl(null, Validators.required),
      recursoArchivo: new FormControl<File | undefined>(undefined, Validators.required)
    })
  }

  ngOnInit(): void {
    this.obtenerTiposArchivo()
  }

  public obtenerTiposArchivo(){
    this.servicioArchivo.obtenerTiposArchivo().subscribe({
      next: (respuesta) => {
        this.tiposArchivo = respuesta.archivos
      }
    })
  }

  public obtenerArchivo(evento: Event) {
    if(!evento.target){
      throw Error('El target del evento no es un input')
    }
    const input = evento.target as HTMLInputElement
    this.formulario.patchValue({ recursoArchivo: input.files ? input.files.item(0) : undefined })
    console.log(this.formulario.value)
  }

  public abrirPopupProcesando(){
    this.popupProcesando.abrir()
  }

  public enviarArchivo():void{
    if(this.formulario.invalid){
      marcarFormularioComoSucio(this.formulario)
      throw Error('Formulario inválido');
    }
    const controls = this.formulario.controls
    this.servicioArchivo.cargarArchivo(
      controls['recursoArchivo'].value,
      {
        fechaInicial: controls['fechaInicial'].value,
        fechaFinal: controls['fechaFinal'].value
      },
      controls['tipoArchivo'].value
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
