import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConsultaDeudaComponent} from './componentes/consulta-deuda/consulta-deuda.component';
import { MetodoPagoWompiComponent} from './componentes/metodo-pago-wompi/metodo-pago-wompi.component';
import { TransaccionComponent } from './componentes/transaccion/transaccion.component';
import { FormularioProcesoPagoComponent } from './componentes/formulario-proceso-pago/formulario-proceso-pago.component';
import { RouterModule} from '@angular/router';



@NgModule({
  declarations: [
    ConsultaDeudaComponent,
    MetodoPagoWompiComponent,
    TransaccionComponent,
    FormularioProcesoPagoComponent
  ],
  imports: [
    CommonModule,
    NgxCaptchaModule,
    FormsModule, ReactiveFormsModule,
    NgbModule,
    RouterModule,

  ]
})
export class PagoModule { }
