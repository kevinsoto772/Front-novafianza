import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupComponent } from './componentes/popup/popup.component';



@NgModule({
  declarations: [
    PopupComponent,
  ],
  imports: [
    CommonModule
  ],
  exports:[
    PopupComponent
  ]
})
export class AlertasModule { }
