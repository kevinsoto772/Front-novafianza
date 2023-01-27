import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicioCabeceraService } from 'src/app/administrador/servicios/servicio-cabecera.service';

@Component({
  selector: 'app-carga-archivos',
  templateUrl: './carga-archivos.component.html',
  styleUrls: ['./carga-archivos.component.css']
})
export class CargaArchivosComponent implements OnInit {
  public archivosCabecera = ['Carga de archivos', '/assets/img/icono-archivos-blanco.svg']
  public formulario: FormGroup
  private archivoTmp: any;
  constructor(private servicioCabercera: ServicioCabeceraService) {
    this.servicioCabercera.actualizarTitulo(this.archivosCabecera)
    this.formulario = new FormGroup({
      tipoArchivo: new FormControl('', [Validators.required]),
      fechaInicial: new FormControl('', [Validators.required]),
      fechaFinal: new FormControl('', Validators.required),
      cargaArchivo: new FormControl(null, Validators.required),
    })
  }

  ngOnInit(): void {

  }

  public obtenerArchivo(evento: any) {
    const [archivo] = evento.target.files;
    this.archivoTmp = {
      archivo: archivo,
      nombreArchivo: archivo.name
    }
  }

  public enviarArchivo() {
    const archivo = new FormData();
    archivo.append('archivo', this.archivoTmp.archivo, this.archivoTmp.nombreArchivo);
    console.log(archivo)
  }

}
