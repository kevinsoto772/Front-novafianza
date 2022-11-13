import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlantillaComponent } from './administrador/componentes/plantilla/plantilla.component';
import { InicioSesionComponent } from './autenticacion/componentes/inicio-sesion/inicio-sesion.component';
import { AutenticacionGuard } from './guards/autenticacion.guard';
import { GestionDeEmpresasComponent } from './administrador/componentes/paginas/gestion-de-empresas/gestion-de-empresas.component';

const routes: Routes = [
  {
    path: 'administrar',
    component: PlantillaComponent,
    children: [
      {
        path:'',
        redirectTo: 'empresas',
        pathMatch: 'full'
      },
      {
        path: 'empresas',
        component: GestionDeEmpresasComponent
      },
    ],
    // canActivate: [AutenticacionGuard]
  },
  {
    path: 'inicio-sesion',
    component: InicioSesionComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'administrar'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
