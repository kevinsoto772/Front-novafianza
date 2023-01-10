import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-plantilla-modal-consulta',
  templateUrl: './metodo-pago-wompi.component.html',
  styleUrls: ['./metodo-pago-wompi.component.css']
})
export class MetodoPagoWompiComponent implements OnInit {
  public llavePublica: string = '';
  public moneda: string = '';
  public referencia: string = '';
  public urlRedireccion: string = '';
  public valorCentavos: number = 0;
  public identificacion: string = '';
  public correo: string = '';
  public telefono: string = '';
  public valor: string = '';
  public tipoDocumento: string = '';

  constructor(private ruta: ActivatedRoute,
    private enrutador: Router) { }

  ngOnInit(): void {
    this.ruta.queryParams.subscribe((params: any) => {
      let informacion_transaccion = params.formulario;
      this.referencia = informacion_transaccion[0]
      this.moneda = informacion_transaccion[1]
      this.llavePublica = informacion_transaccion[2]
      this.urlRedireccion = informacion_transaccion[3]
      this.valorCentavos = informacion_transaccion[4]
      this.identificacion = informacion_transaccion[5]
      this.correo = informacion_transaccion[6]
      this.tipoDocumento = informacion_transaccion[7]
      this.telefono = informacion_transaccion[8]
      this.valor = informacion_transaccion[9]
    });
  }

  public botonRetroceder(){
    this.enrutador.navigate(['/proceso-pago']);
 }

  }


