import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { URL_SERVICIOS } from "../../config/url.servicios";
import { ToastController } from 'ionic-angular';
@Injectable()
export class ActividadesProvider {
	dias:any=[];
	diasprofesor:any=[];
	diaactual:string;
	actividad:any[]=[];
	constructor(public http: Http, public toastCtrl: ToastController ){
	}

	cargar_todos(){
		this.dias=[];
		let promesa = new Promise( (resolve, reject)=>{
			let url=URL_SERVICIOS + "/minutoxminuto.php";
			this.http.get(url)
			.map( resp => resp.json())
			.subscribe(data => {
				if(data.error) {
					
				}else{
					this.dias.push(...data.dias);
					this.diaactual=data.diaactual;
				}

				resolve();

			})
		});
		return promesa;
	}

	cargar_actividad(id_actividad){
		this.actividad=[];
		let promesa = new Promise( (resolve, reject)=>{
			let url=URL_SERVICIOS + "/actividad.php?actividad_id="+id_actividad;
			this.http.get(url)
			.map( resp => resp.json())
			.subscribe(data => {
				if(data.error) {
					
				}else{
					this.actividad=data;
				}

				resolve();

			})
		});
		return promesa;
	}

	cargar_por_profesor(profesor:string){
		let promesa = new Promise( (resolve, reject)=>{
			let url=URL_SERVICIOS + "/actividadesprofesor.php?profesor="+profesor;
			this.http.get(url)
			.map( resp => resp.json())
			.subscribe(data => {
				if(data.error) {	
				}else{
					this.diasprofesor.push(...data.dias);
				}
				resolve();
			})
		});
		return promesa;
	}
	buscar_actividad(actividad:string){
		this.dias=[];
		let promesa = new Promise( (resolve, reject)=>{
			let url=URL_SERVICIOS + "/minutoxminuto.php?search="+actividad;
			this.http.get(url)
			.map( resp => resp.json())
			.subscribe(data => {
				if(data.error) {
					
				}else{
					this.dias.push(...data.dias);
				}
				resolve();

			})
		});
		return promesa;
	}
	presentToast(mensaje: string) {
		let toast = this.toastCtrl.create({
			message: mensaje,
			duration: 3000,
			position: 'bottom'
		});
		toast.present();
	}
}
