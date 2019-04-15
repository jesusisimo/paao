import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
	selector: 'page-patrocinador',
	templateUrl: 'patrocinador.html',
})
export class PatrocinadorPage {
	patrocinador:any={};
	textHTML="";
	constructor(private iab: InAppBrowser, public navCtrl: NavController, public navParams: NavParams) {
		this.patrocinador=this.navParams.get("patrocinador");
		this.textHTML=this.patrocinador.descripcion;
	}

	visitar_pagina(url:string=""){
		if(url!=""){
			this.iab.create(url, "_system");
		}
	}


}
