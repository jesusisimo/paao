import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { URL_SERVICIOS } from "../../config/url.servicios";
import { ToastController } from 'ionic-angular';
@Injectable()
export class ProfesoresProvider {
	pagina:number=0;
	profesores:any[]=[];
	constructor(public http: Http, public toastCtrl: ToastController ){

	}

	cargar_todos(pais:string){
		let promesa = new Promise( (resolve, reject)=>{
			let url=URL_SERVICIOS + "/profesores.php?todos&pagina="+this.pagina+"&pais="+pais;
			this.http.get(url)
			.map( resp => resp.json())
			.subscribe(data => {
				if(data.error) {
					
				}else{
					this.profesores.push(...data.profesores);
					this.pagina=this.pagina+=1;
				}
				resolve();

			})
		});
		return promesa;
	}

	buscar_profesor(profesor:string){
		this.profesores=[];
		let promesa = new Promise( (resolve, reject)=>{
			let url=URL_SERVICIOS + "/profesores.php?search="+profesor;
			this.http.get(url)
			.map( resp => resp.json())
			.subscribe(data => {
				if(data.error) {
					
				}else{
					this.profesores.push(...data.profesores);
					this.pagina=this.pagina+=1;
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
