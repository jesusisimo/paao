import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, ViewController } from 'ionic-angular';
import { AjustesProvider, UsuarioProvider } from '../../providers/index.services';


@IonicPage()
@Component({
	selector: 'page-registro',
	templateUrl: 'registro.html',
})
export class RegistroPage {
	nombre:string="";
	apellidos:string="";
	correo:string="";
	password:string="";
	constructor(public navCtrl: NavController, 
		private loadingCtrl: LoadingController,
		public viewCtrl: ViewController,
		private _us: UsuarioProvider,
		private _as: AjustesProvider) {
	}

	guardar(){
		if(this._as.online) {
			let loader = this.loadingCtrl.create({
				content: "Espere un momento...",
			});
			loader.present();
			this._us.registrar(this.nombre, this.apellidos, this.correo,  this.password ).subscribe(()=>{
				loader.dismiss();
				if(this._us.si_sesion_iniciada()){
					this.viewCtrl.dismiss(true);
				}

			});
		}else{
			this._as.mostrar_toast("No hay conexion a internet");
		}
	}

}
