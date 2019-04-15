import { Component } from '@angular/core';
import { NavController, NavParams, Refresher } from 'ionic-angular';
import { NotificacionesProvider } from "../../providers/index.services";
import { NotificacionPage } from "../index.paginas";
import { AjustesProvider } from "../../providers/index.services";

@Component({
	selector: 'page-notificaciones',
	templateUrl: 'notificaciones.html',
})
export class NotificacionesPage {
	refrescando:boolean=false;
	scrolling:boolean=false;
	notificacion:any=NotificacionPage;

	constructor(public navCtrl: NavController, 
		public navParams: NavParams, 
		private _ns:NotificacionesProvider,
		private _as:AjustesProvider) {
		this._ns.pagina=0;
		this._ns.notificaciones=[];
		if(this._as.online) {
			this._ns.cargar_todos();
		}
	}

	siguiente_pagina(infiniteScroll) {
		if(this._as.online) {
			this.scrolling=true;
			this._ns.cargar_todos()
			.then(()=>{
				infiniteScroll.complete();
				this.scrolling=false;
			})	
		}else{
			infiniteScroll.complete();
			this._as.mostrar_toast("No hay conexion a internet");
		}		
	}

	recargar_notificaciones( refresher:Refresher ){
		if(this._as.online) {
			this.refrescando=true;
			this._ns.pagina=0;
			this._ns.notificaciones=[];
			this._ns.cargar_todos()
			.then(()=>{
				refresher.complete();
				this.refrescando=false;
			})
		}else{
			refresher.complete();
			this._as.mostrar_toast("No hay conexion a internet");
		}
	}

	ver_notificacion(notificacion:any){
		if(this._as.online) {
			this._ns.marcar_visto(notificacion.id);
			this.navCtrl.push(this.notificacion, {'notificacion': notificacion});
		}
	}
}
