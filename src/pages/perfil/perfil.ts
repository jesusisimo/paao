import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { UsuarioProvider } from "../../providers/usuario/usuario";

@IonicPage()
@Component({
	selector: 'page-perfil',
	templateUrl: 'perfil.html',
})
export class PerfilPage {
	titulo: string="Perfil";
	usuario: any={};
	constructor(public navCtrl: NavController, 
		public navParams: NavParams, 
		private viewCtrl: ViewController,
		private _us: UsuarioProvider) {
		this.usuario=this._us.usuario;
		this.titulo=this.usuario.nombre+" "+this.usuario.apellidos;
	}

	cerrar_sesion(){
		this._us.cerrar_sesion();
		this.navCtrl.pop();
	}
	dismiss() {
		this.viewCtrl.dismiss();
	}
}
