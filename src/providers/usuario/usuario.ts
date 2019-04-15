import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { URL_SERVICIOS } from "../../config/url.servicios";
import { AlertController, Platform, LoadingController } from 'ionic-angular';
import { Storage } from "@ionic/storage";



@Injectable()
export class UsuarioProvider {
	token:string;
	id_usuario:string;
	usuario: Credenciales={};
	constructor(public http: Http, 
		private alertCtrl: AlertController,
		private platform: Platform,
		private storage: Storage,
		private loadingCtrl: LoadingController
		){
		this.cargar_storage();
	}

	si_sesion_iniciada(){
		if(this.token){
			return true;
			
		}else{
			return false;
		}
	}

	iniciar_sesion(correo:string, password:string, uid: string, provedor:string){
		let data=new URLSearchParams();
		data.append("correo",correo);
		data.append("password",password);

		let url=URL_SERVICIOS+"/login.php";

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
				this.cargar_usuario(data_resp.id_usuario, data_resp.nombre, data_resp.apellidos,  data_resp.foto, data_resp.correo, data_resp.token);
				this.token=data_resp.token;
				this.id_usuario=data_resp.id_usuario;
				this.guardar_storage();
			}
		});
	}


	iniciar_sesionProvedor(uid: string, nombre:string, apellidos:string, correo:string,  foto:string, provedor:string ){
		let data=new URLSearchParams();
		data.append("uid",uid);
		data.append("nombre",nombre);
		data.append("apellidos",apellidos);
		data.append("correo",correo);
		data.append("foto",foto);
		data.append("provedor",provedor);
		let url=URL_SERVICIOS+"/loginProvedor.php";
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
				this.cargar_usuario(data_resp.id_usuario, data_resp.nombre, data_resp.apellidos,  data_resp.foto, data_resp.correo, data_resp.token);
				this.token=data_resp.token;
				this.id_usuario=data_resp.id_usuario;
				this.guardar_storage();
			}
		});
	}

	obtener_informacion(){
		let data=new URLSearchParams();
		data.append("id_usuario",this.id_usuario);
		let url=URL_SERVICIOS+"/usuario.php";

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
				this.cargar_usuario(data_resp.id_usuario, data_resp.nombre, data_resp.apellidos,  data_resp.foto, data_resp.correo, data_resp.token);
			}
		});
	}


	cargar_usuario(id_usuario:string, nombre:string, apellidos:string, foto:string, email:string, token:string){
		this.usuario.id_usuario=id_usuario;
		this.usuario.nombre=nombre;
		this.usuario.apellidos=apellidos;
		this.usuario.foto=foto;
		this.usuario.email=email;
		this.usuario.token=token;
	}

	cerrar_sesion(){
		this.token=null;
		this.id_usuario=null;
		this.guardar_storage();
		let loader = this.loadingCtrl.create({
			content: "Cerrando Sesión...",
			duration: 3000
		});
		loader.present();
	}

	registrar(nombre:string, apellidos:string, correo:string,  password:string){

		let data=new URLSearchParams();
		data.append("nombre",nombre);
		data.append("apellidos",apellidos);
		data.append("email",correo);
		data.append("password",password);
		let url=URL_SERVICIOS+"/registro.php";
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
				this.cargar_usuario(data_resp.id_usuario, data_resp.nombre, data_resp.apellidos,  data_resp.foto, data_resp.correo, data_resp.token);
				this.token=data_resp.token;
				this.id_usuario=data_resp.id_usuario;
				this.guardar_storage();
			}
		});

	}

	private guardar_storage(){
		if( this.platform.is("cordova") ){
			this.storage.set('token', this.token);
			this.storage.set('id_usuario', this.id_usuario);
		}else{
			if( this.token ){
				localStorage.setItem('token', this.token);
				localStorage.setItem('id_usuario', this.id_usuario);
			}else{
				localStorage.removeItem('token');
				localStorage.removeItem('id_usuario');
			}
		}
	}

	cargar_storage(){

		let promesa = new Promise( ( resolve, reject )=>{
			if( this.platform.is("cordova") ){

				this.storage.ready()
				.then( ()=>{
					this.storage.get("token")
					.then( token =>{
						if( token ){
							this.token = token;
						}
					})
					this.storage.get("id_usuario")
					.then( id_usuario =>{
						if( id_usuario ){
							this.id_usuario = id_usuario;
							this.obtener_informacion().subscribe();
						}
						resolve();
					})
					

				})


			}else{
				if( localStorage.getItem("token") ){
					this.token = localStorage.getItem("token");
					this.id_usuario = localStorage.getItem("id_usuario");
					this.obtener_informacion().subscribe();
				}
				resolve();
			}

		});

		return promesa;

	} 
}

export interface Credenciales{
	id_usuario?:string;
	nombre?:string;
	apellidos?:string;
	foto?:string;
	uid?:string;
	email?:string;
	token?:string;
}