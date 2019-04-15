import { Component } from '@angular/core';
import { PrincipalPage, NotificacionesPage , LoginPage, PerfilPage, WebPage } from "../index.paginas";
import { UsuarioProvider } from "../../providers/usuario/usuario";
import { ModalController, NavController } from 'ionic-angular';

@Component({
	selector: 'page-tabs',
	templateUrl: 'tabs.html',
})
export class TabsPage {
	settings:any;
	notifications:any;
	apps:any;
	favoritos:any;
	salir:any;
	web:any;
	constructor(private _us: UsuarioProvider,
		private modalCtrl: ModalController,
		public navCtrl: NavController) {
		this.apps=PrincipalPage;
		this.notifications=NotificacionesPage;
		this.web=WebPage;
	}

	ver_perfil(){		
		if( this._us.si_sesion_iniciada() ){
			this.navCtrl.push(PerfilPage);
		}else{
			let modal:any;
			modal=this.modalCtrl.create(LoginPage);
			modal.present();
		}
		
	}




}
