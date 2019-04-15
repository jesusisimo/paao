import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LugaresPage } from './lugares';
import { AgmCoreModule } from '@agm/core';


@NgModule({
	declarations: [
	LugaresPage,
	],
	imports: [
	IonicPageModule.forChild(LugaresPage),
	AgmCoreModule	],
})
export class LugaresPageModule {}
