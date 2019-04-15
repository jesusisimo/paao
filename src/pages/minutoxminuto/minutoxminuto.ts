import { Component } from '@angular/core';
import { NavController, NavParams,MenuController, Refresher } from 'ionic-angular';
import { AjustesProvider, ActividadesProvider } from "../../providers/index.services";
import { ActividadPage } from "../index.paginas";

@Component({
	selector: 'page-minutoxminuto',
	templateUrl: 'minutoxminuto.html',
})
export class MinutoxminutoPage {
	refrescando:boolean=false;
	scrolling:boolean=false;
	diaactual: string ;
	actividad:any=ActividadPage;
	constructor(public navCtrl: NavController, 
		public navParams: NavParams, 
		private menuCtrl: MenuController, 
		private _ac:ActividadesProvider,
		private _as:AjustesProvider) {
		if(this._as.online) {

			this._ac.cargar_todos()
			.then(()=>{
				this.diaactual=this._ac.diaactual;
			})

			this.diaactual=this._ac.diaactual;
		}
	}

	mostrar_menu(){
		this.menuCtrl.toggle();
	}

	recargar_actividades(refresher:Refresher ){
		if(this._as.online) {
			this.refrescando=true;
			this._ac.dias=[];
			this._ac.cargar_todos()
			.then(()=>{
				refresher.complete();
				this.refrescando=false;
				this.diaactual=this._ac.diaactual;
			})
		}else{
			refresher.complete();
			this._as.mostrar_toast("No hay conexion a internet");
		}
	}

	ver_detalles(actividad:any){
		this.navCtrl.push(this.actividad, {'actividad': actividad});
	}

	buscar(profesor: any) {


		const val = profesor.target.value;

		if(this._as.online) {
			this.refrescando=true;
			this._ac.dias=[];
			this._ac.buscar_actividad(val);
		}else{
			this._as.mostrar_toast("No hay conexion a internet");
		}
	}


}
