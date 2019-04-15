import { Component } from '@angular/core';
import { NavController, NavParams,MenuController, Refresher } from 'ionic-angular';
import { AjustesProvider, ComitesProvider } from "../../providers/index.services";

@Component({
	selector: 'page-comite',
	templateUrl: 'comite.html',
})
export class ComitePage {
	refrescando:boolean=false;
	scrolling:boolean=false;

	constructor(public navCtrl: NavController, 
		public navParams: NavParams, 
		private menuCtrl: MenuController, 
		private _cs:ComitesProvider,
		private _as:AjustesProvider) {
		if(this._as.online) {
			this._cs.cargar_todos();
		}
	}


	mostrar_menu(){
		this.menuCtrl.toggle();
	}

	siguiente_pagina(infiniteScroll) {
		if(this._as.online) {
			this.scrolling=true;
			this._cs.cargar_todos()
			.then(()=>{
				infiniteScroll.complete();
				this.scrolling=false;
			})
		}else{
			infiniteScroll.complete();
			this._as.mostrar_toast("No hay conexion a internet");
		}
	}

	recargar_comites( refresher:Refresher ){
		if(this._as.online) {
			this.refrescando=true;
			this._cs.pagina=0;
			this._cs.comites=[];
			this._cs.cargar_todos()
			.then(()=>{
				refresher.complete();
				this.refrescando=false;
			})
		}else{
			refresher.complete();
			this._as.mostrar_toast("No hay conexion a internet");
		}
	}
	

}
