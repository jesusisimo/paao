import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { URL_SERVICIOS } from "../../config/url.servicios";
import { ToastController } from 'ionic-angular';
@Injectable()
export class PaisesProvider {
	pagina:number=0;
	paises:any[]=[];
	constructor(public http: Http, public toastCtrl: ToastController ){
	}

	cargar_todos(){
		let promesa = new Promise( (resolve, reject)=>{
			let url=URL_SERVICIOS + "/paises.php?todos&pagina="+this.pagina;
			this.http.get(url)
			.map( resp => resp.json())
			.subscribe(data => {
				if(data.error) {
					
				}else{
					this.paises.push(...data.paises);
					this.pagina=this.pagina+=1;
				}
				resolve();

			})
		});
		return promesa;
	}

}
