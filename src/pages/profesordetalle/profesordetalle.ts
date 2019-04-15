import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ActividadesProvider } from "../../providers/index.services";
import { ActividadPage } from "../index.paginas";

@Component({
	selector: 'page-profesordetalle',
	templateUrl: 'profesordetalle.html',
})
export class ProfesordetallePage {
	profesor:any={};
	textHTML="";
	tieneCurriculum=false;
	tipo: string = "act";
	actividad:any=ActividadPage;
	constructor(public navCtrl: NavController, 
		public navParams: NavParams,
		public act: ActividadesProvider) {
		this.profesor=this.navParams.get("profesor");
		this.textHTML=this.profesor.curriculum;
		if(this.profesor.curriculum!=""){
			this.tieneCurriculum=true;
		}

		this.act.diasprofesor=[];
		this.act.cargar_por_profesor(this.profesor.id)
		.then(()=>{
		})
		
	}

	ver_detalles(actividad:any){
		this.navCtrl.push(this.actividad, {'actividad': actividad});
	}


}
