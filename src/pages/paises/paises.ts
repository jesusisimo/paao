import { Component } from '@angular/core';
import { NavController, NavParams,MenuController, Refresher } from 'ionic-angular';
import { AjustesProvider, PaisesProvider } from "../../providers/index.services";
import { ProfesoresPage } from "../index.paginas";

@Component({
	selector: 'page-paises',
	templateUrl: 'paises.html',
})
export class PaisesPage {
	refrescando:boolean=false;
	scrolling:boolean=false;
	profesores:any = ProfesoresPage;
	constructor(public navCtrl: NavController, 
		public navParams: NavParams, 
		private menuCtrl: MenuController, 
		private _ps:PaisesProvider,
		private _as:AjustesProvider) {
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

	recargar_paises( refresher:Refresher ){
		if(this._as.online) {
			this.refrescando=true;
			this._ps.pagina=0;
			this._ps.paises=[];
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
	verProfesoresPais(pais){
		this.navCtrl.push(this.profesores, {'pais':pais.id,'nombrePais':pais.pais});
	}

}
