import { Component } from '@angular/core';
import { NavController, NavParams,MenuController, Refresher, LoadingController, AlertController } from 'ionic-angular';
import { AjustesProvider, VotacionProvider, UsuarioProvider } from "../../providers/index.services";

@Component({
	selector: 'page-votacion',
	templateUrl: 'votacion.html',
})
export class VotacionPage {
	refrescando:boolean=false;
	scrolling:boolean=false;
	seleccionada:boolean;
	constructor(public navCtrl: NavController, 
		public navParams: NavParams, 
		private menuCtrl: MenuController, 
		private _vs:VotacionProvider,
		private _as:AjustesProvider,
		private _us:UsuarioProvider,
		private loadingCtrl:LoadingController,
		private alertCtrl: AlertController) {
		if(this._us.si_sesion_iniciada()) {
			if(this._as.online) {
				this._vs.opciones=[];
				this._vs.cargar_pregunta();
			}
		}else{
			this._vs.mensaje="Para participar en las votaciones inicia sesión";
		}
		
		this.seleccionada=false;
	}


	mostrar_menu(){
		this.menuCtrl.toggle();
	}


	recargar_votacion( refresher:Refresher ){
		if(this._us.si_sesion_iniciada()) {
			if(this._as.online) {
				this.refrescando=true;
				this._vs.opcion_seleccionada="0";
				this._vs.opciones=[];
				this.seleccionada=false;
				this._vs.cargar_pregunta()
				.then(()=>{
					refresher.complete();
					this.refrescando=false;
				})
			}else{
				refresher.complete();
				this._as.mostrar_toast("No hay conexion a internet");
			}
		}else{
			refresher.complete();
			this.refrescando=false;
			this._vs.mensaje="Para participar en las votaciones inicia sesión";
		}
	}
	
	seleccionar_opcion(opcion:string){
		this.seleccionada=true;
		this._vs.opcion_seleccionada=opcion;
	}
	enviar_respuesta(){


		let alert = this.alertCtrl.create({
			title: 'Confirme su respuesta',
			message: 'Está seguro de enviar su respuesta?',
			buttons: [
			{
				text: 'Cancelar',
				role: 'cancel',
				handler: () => {
				}
			},
			{
				text: 'Seguro',
				handler: () => {
					let loader = this.loadingCtrl.create({
						content: "Enviando respuesta...",
					});
					loader.present();
					this._vs.enviar_respuesta(this._vs.pregunta_id, this._vs.opcion_seleccionada, this._us.id_usuario).subscribe(()=>{
						loader.dismiss();
						this.seleccionada=false;
						this._vs.opcion_seleccionada="0";
					});
				}
			}
			]
		});
		alert.present();
	}




}
