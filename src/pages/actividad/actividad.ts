import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AjustesProvider, ActividadesProvider } from "../../providers/index.services";

@Component({
	selector: 'page-actividad',
	templateUrl: 'actividad.html',
})
export class ActividadPage {
	actividad:any={};
	textHTML="";
	constructor(public navCtrl: NavController, 
		public navParams: NavParams,
		private _ac:ActividadesProvider,
		private _as:AjustesProvider,
		private loadingCtrl:LoadingController
		) {
		this.actividad=this.navParams.get("actividad");
		if(this._as.online) {
			let loader = this.loadingCtrl.create({
				content: "Cargando...",
			});
			loader.present();
			this._ac.cargar_actividad(this.actividad.id)
			.then(()=>{
				console.log("Consultado: ",this._ac.actividad);
				this.actividad=this._ac.actividad;
				loader.dismiss();
			})
		}
	}


}
