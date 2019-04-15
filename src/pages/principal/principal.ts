import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { WebPage, PatrocinadorPage, PaisesPage, VotacionPage, ProfesoresPage,ComitePage, SalonesPage, MinutoxminutoPage, PatrocinadoresPage,IntroduccionPage,LugaresPage } from "../index.paginas";
import { AjustesProvider } from '../../providers/index.services';
import { InAppBrowser } from '@ionic-native/in-app-browser';


@Component({
	selector: 'page-principal',
	templateUrl: 'principal.html',
})
export class PrincipalPage {
	profesores:any = ProfesoresPage;
	comite:any = ComitePage;
	salones:any = SalonesPage;
	minutoxminuto:any = MinutoxminutoPage;
	patrocinadores:any = PatrocinadoresPage;
	introduccion:any = IntroduccionPage;
	lugares:any = LugaresPage;
	paises:any = PaisesPage;
	votacion:any = VotacionPage;
	detallespatrocinador:any=PatrocinadorPage;
	web:any=WebPage;
	constructor(private iab: InAppBrowser, public navCtrl: NavController, public navParams: NavParams,  private menuCtrl: MenuController, private ajustes:AjustesProvider) {
	}

	navegarPagina(pagina:any){
		this.navCtrl.push(pagina);
	}


	abrirWeb(url:string, target:string){
		if(target=="_system") {
			this.visitar_pagina(url);
		}else{
			this.navCtrl.push(WebPage, {'url':url});
		}
		
	}

	mostrar_menu(){
		this.menuCtrl.toggle();
	}

	visitar_pagina(url:string=""){
		if(url!=""){
			this.iab.create(url, "_system");
		}
	}
	


}
