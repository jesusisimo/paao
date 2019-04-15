import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { TabsPage } from "../tabs/tabs";
import { AjustesProvider } from "../../providers/ajustes/ajustes";


@Component({
	selector: 'page-introduccion',
	templateUrl: 'introduccion.html',
})
export class IntroduccionPage {
	slides = [
	{
		title: "Mensaje de la presidenta",
		description: "Me complace que haya llegado el momento de celebrar nuestro tradicional Congreso de Radioterapia, en el que colegas  y  familiares  compartimos por 4 días los retos, logros y oportunidades en el amplio campo de la radioterapia.",
		image: "assets/img/FotoPresidenta.png",
		fin: false,
	},
	{
		title: "",
		description: "El comité organizador ha pensado con cuidado y por varios meses el contenido del programa académico que aquí presentamos, en el cual incluimos a reconocidos expertos de México y el mundo que expondrán los temas que consideramos más relevantes y de vanguardia a nivel global para mejorar los tratamientos, y continuar con el desarrollo académico de nuestra disciplina. Entre los rubros a destacar, contaremos con hipofraccionamiento en mama, recto, próstata, así como los avances que presenta la inmunoterapia y resultados de estudios en cáncer de cabeza y cuello. Además del taller de contorneo y de los programas de Física Médica y de los jóvenes.",
		image: "assets/img/FotoPresidenta.png",
		fin: false,
	},
	{
		title: "",
		description: "Quiero agradecer a todos los miembros de SOMERA, a la mesa directiva, al comité organizador, expositores, académicos, al total de la sociedad médica y a la industria, sin la cual también sería imposible tener este evento. Espero que disfrutemos estos días en el entorno de las bellas playas de Puerto Vallarta.",
		image: "assets/img/FotoPresidenta.png",
		fin: true,
	}
	];
	constructor(public navCtrl: NavController, public navParams: NavParams, private ajustes: AjustesProvider, private viewCtrl: ViewController) {
	}

	saltar_tutorial(){
		if(this.ajustes.ajustes.mostrar_introduccion==true) {
			this.ajustes.ajustes.mostrar_introduccion=false;
			//this.ajustes.guardar_storage();
			this.navCtrl.setRoot(TabsPage);
		}else{
			this.viewCtrl.dismiss();
		}		
	}
}
