import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
@Injectable()
export class UbicacionProvider {
	latitud: number;
	longitud: number;
	compartiendo: boolean;
	constructor(private geolocation: Geolocation) {
		this.compartiendo=true;
		this.iniciarGeolocalizacion();
	}
	iniciarGeolocalizacion(){

		this.geolocation.getCurrentPosition().then((resp) => {
			console.log("Primera vez", resp.coords);
			this.latitud=resp.coords.latitude;
			this.longitud=resp.coords.longitude;
			this.compartiendo=true;
		}).catch((error) => {
			this.compartiendo=false;
		});

		let watch = this.geolocation.watchPosition();
		watch.subscribe((data) => {
			this.compartiendo=true;
			this.latitud=data.coords.latitude
			this.longitud=data.coords.longitude
		});
	}

}
