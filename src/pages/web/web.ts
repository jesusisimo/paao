import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { AjustesProvider, UsuarioProvider } from "../../providers/index.services";

@IonicPage()
@Component({
	selector: 'page-web',
	templateUrl: 'web.html',
})
export class WebPage {
	url:string;
	constructor(public navCtrl: NavController, 
		public navParams: NavParams,
		public sanitizer: DomSanitizer,
		private _as:AjustesProvider,
		private _us:UsuarioProvider) {

		if(this._us.si_sesion_iniciada()) {
			this.url=this.navParams.get("url")+"&usuario="+_us.id_usuario;
		}else{
			this.url=this.navParams.get("url");
		}
		
		console.log(this.url);
	}
}
