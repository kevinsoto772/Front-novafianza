import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Empresa } from '../../modelos/Empresa';
import { TipoArchivo } from 'src/app/archivos/modelos/TipoArchivo';
import { CargarArchivosService } from 'src/app/archivos/servicios/cargar-archivos.service';
import { EmpresasService } from '../../servicios/empresas.service';
import { PopupComponent } from 'src/app/alertas/componentes/popup/popup.component';
import { ModalAdjuntarManualComponent } from '../modal-adjuntar-manual/modal-adjuntar-manual.component';
import { ArchivoEmpresa } from 'src/app/archivos/modelos/ArchivoEmpresa';
import { ModalVisualizarManualComponent } from '../modal-visualizar-manual/modal-visualizar-manual.component';

@Component({
  selector: 'app-modal-asignar-servicios',
  templateUrl: './modal-asignar-servicios.component.html',
  styleUrls: ['./modal-asignar-servicios.component.css']
})
export class ModalAsignarServiciosComponent implements OnInit {
  @ViewChild('modal') modal!: ElementRef
  @ViewChild('popup') popup!: PopupComponent
  @ViewChild('modalAdjuntar') modalAdjuntar!: ModalAdjuntarManualComponent
  @ViewChild('modalVisualizar') modalVisualizar!: ModalVisualizarManualComponent

  filtro: string = ''
  empresa?: Empresa
  archivos: TipoArchivo[] = []
  archivosFiltrados: TipoArchivo[] = []
  archivosEmpresa: ArchivoEmpresa[] = []
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

  manejarNombreArchivoActual(idArchivo: string){
    for (const archivo of this.archivosEmpresa) {
      if(idArchivo === archivo.idArchivo){
        return archivo.manual ?? '-'
      }
    }
    return '-'
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
        this.archivosFiltrados = respuesta.archivos
      }
    })
  }

  obtenerArchivosEmpresa(idEmpresa: string){
    this.servicioEmpresa.listarArchivos(idEmpresa).subscribe({
      next: (archivosEmpresa) => {
        this.archivosEmpresa = archivosEmpresa
        this.idsArchivosSeleccionados = archivosEmpresa
        .filter( archivosEmpresa => archivosEmpresa.estado === true )
        .map( archivoEmpresa => archivoEmpresa.idArchivo )
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

  abrirModalAdjuntar(archivo: TipoArchivo){
    this.modalAdjuntar.abrir(archivo, this.empresa!.id!)
  }

  abrirModalVisualizar(url: string){
    if(url === '-' || url === '' || !url){
      this.popup.abrirPopupFallido('Este servicio no tiene un documento adjunto')
      return 
    }
    this.modalVisualizar.abrir(url)
  }

  filtrar(filtro: string){
    if(filtro !== ''){
      this.archivosFiltrados = this.archivos.filter( archivo => archivo.nombre.toLowerCase().includes(filtro.toLowerCase()) )
    }else{
      this.archivosFiltrados = this.archivos
    }
  }

}
