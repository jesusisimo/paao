import { Injectable } from '@angular/core';
import { Http,URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { URL_SERVICIOS } from "../../config/url.servicios";
import { ToastController,AlertController } from 'ionic-angular';
import { UsuarioProvider } from "../../providers/index.services";

@Injectable()
export class VotacionProvider {
	opciones:any[]=[];
	pregunta:string;
	error:boolean;
	mensaje:string;
	contestada:boolean;
	pregunta_id:string;
	opcion_seleccionada:string;
	constructor(public http: Http, public toastCtrl: ToastController, public alertCtrl: AlertController, public usuario: UsuarioProvider){
		this.error=true;
	}

	cargar_pregunta(){
		this.opcion_seleccionada="0";
		this.opciones=[];
		let promesa = new Promise( (resolve, reject)=>{
			let url=URL_SERVICIOS + "/votaciones.php?get&usuario_id="+this.usuario.id_usuario;
			this.http.get(url)
			.map( resp => resp.json())
			.subscribe(data => {
				if(data.error) {
					this.opcion_seleccionada="";
					this.opciones=[];
					this.pregunta="";
					this.error=data.error;;
					this.mensaje=data.mensaje;
				}else{
					this.error=data.error;;
					this.opcion_seleccionada="0";
					this.opciones.push(...data.opciones);
					this.pregunta=data.pregunta;
					this.pregunta_id=data.id;
					this.mensaje=data.mensaje;
					this.contestada=data.contestada;
				}
				resolve();

			})
		});
		return promesa;
	}


	enviar_respuesta(pregunta_id:string, opcion_id:string, usuario_id:string){

		let data=new URLSearchParams();
		data.append("pregunta_id",pregunta_id);
		data.append("opcion_id",opcion_id);
		data.append("usuario_id",usuario_id);
		let url=URL_SERVICIOS+"/votaciones.php?votar";
		return this.http.post(url,data)
		.map(resp=>{
			let data_resp = resp.json();
			if(data_resp.error){
				this.alertCtrl.create({
					title:"Error",
					subTitle: data_resp.mensaje,
					buttons:["OK"]
				}).present();
			}else{
				this.cargar_pregunta();
			}
		});

	}

}
