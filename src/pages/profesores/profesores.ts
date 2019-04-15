import { Component } from '@angular/core';
import { NavController, NavParams,MenuController, Refresher, LoadingController } from 'ionic-angular';
import { ProfesordetallePage } from "../index.paginas";
import { AjustesProvider, ProfesoresProvider } from "../../providers/index.services";


@Component({
	selector: 'page-profesores',
	templateUrl: 'profesores.html',
})
export class ProfesoresPage {
	refrescando:boolean=false;
	scrolling:boolean=false;
	detallesprofesor:any=ProfesordetallePage;
	pais:string;
	nombrePais:string="";
	searchQuery: string = '';
	constructor(public navCtrl: NavController, 
		public navParams: NavParams, 
		private menuCtrl: MenuController, 
		private _ps:ProfesoresProvider,
		private _as:AjustesProvider,
		private loadingCtrl: LoadingController) {
		this.pais=this.navParams.get('pais');
		this.nombrePais=this.navParams.get('nombrePais');
		this._ps.pagina=0;
		this._ps.profesores=[];
		if(this._as.online) {
			let loader = this.loadingCtrl.create({
				content: "Cargando...",
			});
			loader.present();
			this._ps.cargar_todos(this.pais)
			.then(()=>{
				loader.dismiss();
			})
		}
		
	}

	mostrar_menu(){
		this.menuCtrl.toggle();
	}

	siguiente_pagina(infiniteScroll) {
		if(this._as.online) {
			this.scrolling=true;
			this._ps.cargar_todos(this.pais)
			.then(()=>{
				infiniteScroll.complete();
				this.scrolling=false;
			})
		}else{
			infiniteScroll.complete();
			this._as.mostrar_toast("No hay conexion a internet");
		}
	}

	recargar_profesores( refresher:Refresher ){
		if(this._as.online) {
			this.refrescando=true;
			this._ps.pagina=0;
			this._ps.profesores=[];
			this._ps.cargar_todos(this.pais)
			.then(()=>{
				refresher.complete();
				this.refrescando=false;
			})
		}else{
			refresher.complete();
			this._as.mostrar_toast("No hay conexion a internet");
		}
	}
	

	ver_detalles(profesor:any){
		this.navCtrl.push(this.detallesprofesor, {'profesor': profesor});
	}


	buscar(profesor: any) {


		const val = profesor.target.value;

		if(this._as.online) {
			this.refrescando=true;
			this._ps.pagina=0;
			this._ps.profesores=[];
			this._ps.buscar_profesor(val);
		}else{
			this._as.mostrar_toast("No hay conexion a internet");
		}
	}


}
