import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfesordetallePage } from './profesordetalle';

@NgModule({
  declarations: [
    ProfesordetallePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfesordetallePage),
  ],
})
export class ProfesordetallePageModule {}
