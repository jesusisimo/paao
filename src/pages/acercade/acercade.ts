import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-acercade',
	templateUrl: 'acercade.html',
})
export class AcercadePage {

	constructor(public navCtrl: NavController, private menuCtrl: MenuController) {
	}

	mostrar_menu(){
		this.menuCtrl.toggle();
	}

}
