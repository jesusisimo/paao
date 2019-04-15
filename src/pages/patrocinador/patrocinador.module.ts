import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatrocinadorPage } from './patrocinador';

@NgModule({
  declarations: [
    PatrocinadorPage,
  ],
  imports: [
    IonicPageModule.forChild(PatrocinadorPage),
  ],
})
export class PatrocinadorPageModule {}
