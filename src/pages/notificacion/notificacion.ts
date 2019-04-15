import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
	selector: 'page-notificacion',
	templateUrl: 'notificacion.html',
})
export class NotificacionPage {
	notificacion:any={};
	textHTML="";
	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.notificacion=this.navParams.get("notificacion");
	}


}
