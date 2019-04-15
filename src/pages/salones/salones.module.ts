import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalonesPage } from './salones';

@NgModule({
  declarations: [
    SalonesPage,
  ],
  imports: [
    IonicPageModule.forChild(SalonesPage),
  ],
})
export class SalonesPageModule {}
