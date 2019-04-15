import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, ViewController } from 'ionic-angular';
import { AjustesProvider, LugaresProvider, UbicacionProvider } from "../../providers/index.services";

@Component({
	selector: 'page-lugares',
	templateUrl: 'lugares.html',
})
export class LugaresPage {
	title: string;
	lat: number;
	lng: number;

	title2: string;
	lat2: number;
	lng2: number;

	constructor(public navCtrl: NavController, 
		public navParams: NavParams, 
		private menuCtrl: MenuController, 
		private _ls: LugaresProvider,
		private _as: AjustesProvider,
		private viewCtrl: ViewController,
		public miubicacion: UbicacionProvider) {
		
		if(this._as.online) {
			this._ls.cargar_todos();
		}

		this.title = 'Puerto Vallarta';
		this.lat = 20.6262325;
		this.lng = -105.2333715;
		
	}



	mostrar_menu(){
		this.menuCtrl.toggle();
	}


	

}
