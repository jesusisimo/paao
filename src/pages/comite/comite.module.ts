import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComitePage } from './comite';

@NgModule({
  declarations: [
    ComitePage,
  ],
  imports: [
    IonicPageModule.forChild(ComitePage),
  ],
})
export class ComitePageModule {}
