import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WompiService } from '../../servicios/wompi.service';

@Component({
  selector: 'app-transaccion-pago',
  templateUrl: './transaccion.component.html',
  styleUrls: ['./transaccion.component.css']
})
export class TransaccionComponent implements OnInit {
  public sub;
  public id?: string;
  public transaccion: any[] = [];
  public valorPagado: number = 0;
  public fechaPago?: string;
  public actualizar: boolean = false;


  constructor(private Activatedroute: ActivatedRoute,
    private router: Router, private servicioWompi: WompiService) {
    this.sub = this.Activatedroute.queryParamMap
      .subscribe(params => {
        this.id = params.get('id')!;
        console.log('id',this.id)
      });
  }

  ngOnInit(): void {
    this.servicioWompi.consultaTransaccion(this.id!).subscribe((transaccion) => {
      this.transaccion = Object.values(transaccion)
      this.valorPagado = (this.transaccion[0].amount_in_cents) / 100
      let fecha = new Date(this.transaccion[0].created_at)
      this.fechaPago = `${fecha.getDate()} / ${fecha.getMonth()+1} / ${fecha.getFullYear()} - ${fecha.getHours()}:${fecha.getMinutes()}`
      console.log(this.transaccion)
    })

  }

  public actualizarEstado(): void {
    if (this.transaccion[0].status == "APPROVED" || this.transaccion[0].status == "DECLINED") {
      this.actualizar = true;
    }
  }

}
