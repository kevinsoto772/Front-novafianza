import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Empresa } from '../../modelos/Empresa';
import { TipoArchivo } from 'src/app/archivos/modelos/TipoArchivo';
import { CargarArchivosService } from 'src/app/archivos/servicios/cargar-archivos.service';
import { EmpresasService } from '../../servicios/empresas.service';
import { filter } from 'rxjs';
import { PopupComponent } from 'src/app/alertas/componentes/popup/popup.component';

@Component({
  selector: 'app-modal-asignar-servicios',
  templateUrl: './modal-asignar-servicios.component.html',
  styleUrls: ['./modal-asignar-servicios.component.css']
})
export class ModalAsignarServiciosComponent implements OnInit {
  @ViewChild('modal') modal!: ElementRef
  @ViewChild('popup') popup!: PopupComponent

  empresa?: Empresa
  archivos: TipoArchivo[] = []
  idsArchivosSeleccionados: string[] = []
  formulario: FormGroup

  constructor(private servicioModal: NgbModal, private servicioArchivo: CargarArchivosService, private servicioEmpresa: EmpresasService) { 
    this.formulario = new FormGroup({})
  }

  ngOnInit(): void {
    this.obtenerArchivos()
  }

  marcarCheckBoxArchivo(idArchivo: string): boolean{
    return this.idsArchivosSeleccionados.includes(idArchivo) ? true : false
  }

  manejarCheckBox(checkbox: HTMLInputElement, idArchivo: string){
    if(checkbox.checked){
      this.agregarArchivo(idArchivo)
    }else{
      this.removerArchivo(idArchivo)
    }
    console.log(this.idsArchivosSeleccionados)
  }

  private agregarArchivo(idArchivo: string){
    this.idsArchivosSeleccionados.push(idArchivo)
  }

  private removerArchivo(idArchivo: string){
    if(this.idsArchivosSeleccionados.includes(idArchivo)){
      this.idsArchivosSeleccionados = this.idsArchivosSeleccionados.filter( idArchivoSeleccionado => idArchivoSeleccionado !== idArchivo )
    }
  }

  obtenerArchivos(){
    this.servicioArchivo.obtenerTiposArchivo().subscribe({
      next: ( respuesta ) => {
        this.archivos = respuesta.archivos
      }
    })
  }

  obtenerArchivosEmpresa(idEmpresa: string){
    this.servicioEmpresa.listarArchivos(idEmpresa).subscribe({
      next: (archivosEmpresa) => {
        this.idsArchivosSeleccionados = archivosEmpresa.map( archivoEmpresa => archivoEmpresa.idArchivo )
      }
    })
  }

  guardarArchivosEmpresa(){
    this.servicioEmpresa.asignarArchivos(this.empresa!.id!, this.idsArchivosSeleccionados).subscribe({
      next: (respuesta => {
        this.popup.abrirPopupExitoso('Guardado correctamente.')
      })
    });
  }


  abrir(empresa: Empresa){
    this.empresa = empresa
    this.obtenerArchivosEmpresa(empresa.id!)
    this.servicioModal.open(this.modal, {
      size: 'xl'
    })
  }

}
