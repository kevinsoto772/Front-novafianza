import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlantillaComponent } from './administrador/componentes/plantilla/plantilla.component';
import { InicioSesionComponent } from './autenticacion/componentes/inicio-sesion/inicio-sesion.component';
import { AutenticacionGuard } from './guards/autenticacion.guard';
import { GestionDeEmpresasComponent } from './administrador/componentes/paginas/gestion-de-empresas/gestion-de-usuarios.component';
import { ActualizarContrasenaComponent } from './autenticacion/componentes/actualizar-contrasena/actualizar-contrasena.component';
import { CargaArchivosComponent } from './administrador/componentes/paginas/carga-archivos/carga-archivos.component';
import { HistorialNovedadesComponent } from './administrador/componentes/paginas/historial-novedades/historial-novedades.component';
import { ReportesComponent } from './administrador/componentes/paginas/reportes/reportes.component';
import { ConfiguracionDeCuentaComponent } from './administrador/componentes/paginas/configuracion-de-cuenta/configuracion-de-cuenta.component';
import { AutorizacionGuard } from './guards/autorizacion.guard';
import { ConsultaDeudaComponent } from './pago/componentes/consulta-deuda/consulta-deuda.component';
import { MetodoPagoWompiComponent} from './pago/componentes/metodo-pago-wompi/metodo-pago-wompi.component';
import { TransaccionComponent} from './pago/componentes/transaccion/transaccion.component';
import { FormularioProcesoPagoComponent } from './pago/componentes/formulario-proceso-pago/formulario-proceso-pago.component';


const routes: Routes = [
  {
    path: 'administrar',
    component: PlantillaComponent,
    children: [
      {
        path: 'crear_usuarios',
        component: GestionDeEmpresasComponent
      },
      {
        path: 'cargar_archivos',
        component: CargaArchivosComponent
      },
      {
        path: 'historial_novedades',
        component: HistorialNovedadesComponent
      },{
        path: 'reportes',
        component: ReportesComponent
      },
      {
        path: 'configuracion_de_cuenta',
        component: ConfiguracionDeCuentaComponent
      },
    ],
    canActivate: [AutenticacionGuard, AutorizacionGuard]

  },
  {
    path: 'consulta-obligacion',
    component: ConsultaDeudaComponent
  },
  {
    path: 'proceso-pago',
    component: FormularioProcesoPagoComponent
  },
  {
    path: 'pagar-obligacion',
    component: MetodoPagoWompiComponent
  },
  {
    path: 'pago',
    component: TransaccionComponent
  },
  {
    path: 'inicio-sesion',
    component: InicioSesionComponent
  },
  {
    path: 'actualizar-contrasena',
    component: ActualizarContrasenaComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'inicio-sesion'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
