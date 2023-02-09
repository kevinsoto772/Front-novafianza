import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicioCabeceraService } from 'src/app/administrador/servicios/servicio-cabecera.service';
import { CargarArchivosService } from '../../servicios/cargar-archivos.service';

@Component({
  selector: 'app-pagina-carga-archivos',
  templateUrl: './pagina-carga-archivos.component.html',
  styleUrls: ['./pagina-carga-archivos.component.css']
})
export class PaginaCargaArchivosComponent implements OnInit {
  public archivosCabecera = ['Carga de archivos', '/assets/img/icono-archivos-blanco.svg']
  public formulario: FormGroup
  constructor(private servicioCabercera: ServicioCabeceraService, private servicioArchivo: CargarArchivosService) {
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

  }

  public obtenerArchivo(evento: Event) {
    if(!evento.target){
      throw Error('El target del evento no es un input')
    }
    const input = evento.target as HTMLInputElement
    this.formulario.patchValue({ recursoArchivo: input.files ? input.files.item(0) : undefined })
    console.log(this.formulario.value)
  }

  public enviarArchivo():void{
    if(this.formulario.invalid){
      throw Error('Formulario inválido')
    }
    
  }

}
