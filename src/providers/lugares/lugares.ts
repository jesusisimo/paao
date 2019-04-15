import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { URL_SERVICIOS } from "../../config/url.servicios";
import { ToastController } from 'ionic-angular';
@Injectable()
export class LugaresProvider {
	pagina:number=0;
	lugares:any[]=[];
	constructor(public http: Http, public toastCtrl: ToastController ){	
	}

	cargar_todos(){
		let promesa = new Promise( (resolve, reject)=>{
			let url=URL_SERVICIOS + "/lugares.php?todos&pagina="+this.pagina;
			this.http.get(url)
			.map(resp => resp.json())
			.subscribe(data => {
				if(data.error) {
					
				}else{
					this.lugares.push(...data.lugares);
					this.pagina=this.pagina+=1;
				}
				resolve();

			})
		});
		return promesa;
	}


}
