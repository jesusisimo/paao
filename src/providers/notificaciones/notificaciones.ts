import { Injectable } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal';
import { Platform, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { URL_SERVICIOS } from "../../config/url.servicios";
import { AjustesProvider } from '../../providers/ajustes/ajustes';


@Injectable()
export class NotificacionesProvider {
	pagina:number=0;
	notificaciones:any[]=[];
	constructor(public http: Http, 
		private oneSignal: OneSignal, 
		public platform: Platform, 
		public alertCtrl: AlertController, 
		private _as: AjustesProvider,
		private loadingCtrl: LoadingController) {
	}


	init_notificaciones(){
		if(this.platform.is('cordova')) {
			
			this.oneSignal.startInit('bf955572-d630-44dc-bc5a-3d826efe620a', '843018529443');

			this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

			this.oneSignal.handleNotificationReceived();

			this.oneSignal.handleNotificationOpened().subscribe(() => {
				
			});

			this.oneSignal.endInit();

		}else{
		}
	}

	presentAlert(mensaje: string) {
		let alert = this.alertCtrl.create({
			title: 'Notifiacion',
			subTitle: mensaje,
			buttons: ['Dismiss']
		});
		alert.present();
	}

	cargar_todos(){
		let loader = this.loadingCtrl.create({
			content: "Cargando...",
		});
		loader.present();

		let promesa = new Promise( (resolve, reject)=>{
			let url=URL_SERVICIOS + "/notificaciones.php?accion=get&pagina="+this.pagina+"&uuid="+this._as.ajustes.uuid;
			this.http.get(url)
			.map( resp => resp.json())
			.subscribe(data => {
				if(data.error) {
					
				}else{

					this.notificaciones.push(...data.notificaciones);
					this.pagina=this.pagina+=1;
				}
				loader.dismiss();
				resolve();

			})
		});
		return promesa;
	}

	marcar_visto(id){
		let promesa = new Promise( (resolve, reject)=>{
			let url=URL_SERVICIOS + "/notificaciones.php?accion=setvisto&uuid="+this._as.ajustes.uuid+"&notificacion="+id;
			this.http.get(url)
			.map( resp => resp.json())
			.subscribe(data => {
				resolve();
			})
		});
		return promesa;
	}













}
