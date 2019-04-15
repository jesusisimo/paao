import { Component } from '@angular/core';
import { NavController, NavParams,MenuController, Refresher } from 'ionic-angular';
import { PatrocinadorPage } from "../index.paginas";
import { AjustesProvider, PatrocinadoresProvider } from "../../providers/index.services";

@Component({
	selector: 'page-patrocinadores',
	templateUrl: 'patrocinadores.html',
})
export class PatrocinadoresPage {
	refrescando:boolean=false;
	scrolling:boolean=false;
	detallespatrocinador:any=PatrocinadorPage;

	constructor(public navCtrl: NavController, 
		public navParams: NavParams, 
		private menuCtrl: MenuController, 
		private _ps: PatrocinadoresProvider,
		private _as: AjustesProvider) {
		if(this._as.online) {
			this._ps.cargar_todos();
		}
	}


	mostrar_menu(){
		this.menuCtrl.toggle();
	}

	siguiente_pagina(infiniteScroll) {
		if(this._as.online) {
			this.scrolling=true;
			this._ps.cargar_todos()
			.then(()=>{
				infiniteScroll.complete();
				this.scrolling=false;
			})
		}else{
			infiniteScroll.complete();
			this._as.mostrar_toast("No hay conexion a internet");
		}
	}

	recargar_patrocinadores( refresher:Refresher ){
		if(this._as.online) {
			this.refrescando=true;
			this._ps.pagina=0;
			this._ps.patrocinadores=[];
			this._ps.cargar_todos()
			.then(()=>{
				refresher.complete();
				this.refrescando=false;
			})
		}else{
			refresher.complete();
			this._as.mostrar_toast("No hay conexion a internet");
		}
	}
	ver_detalles(patrocinador:any){
		this.navCtrl.push(this.detallespatrocinador, {'patrocinador': patrocinador});
	}
	

}
