import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController, ViewController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AjustesProvider, UsuarioProvider } from '../../providers/index.services';
import { PerfilPage, RegistroPage } from "../index.paginas";

//firebase
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
//facebook
import { Facebook } from '@ionic-native/facebook';
//google plus falta clave de produccion
import { GooglePlus } from '@ionic-native/google-plus';


@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {
	correo:string="";
	password:string="";

	constructor(public navCtrl: NavController, 
		public navParams: NavParams, 
		private modalCtrl: ModalController,
		private viewCtrl: ViewController,
		private loadingCtrl: LoadingController,
		private _us: UsuarioProvider,
		private afAuth: AngularFireAuth,
		private fb: Facebook,
		private googlePlus: GooglePlus,
		private platform: Platform,
		private _as: AjustesProvider) {
	}
	singInWhitGoogle(){
		this.googlePlus.login({
			'webClientId': '843018529443-hjcu4t82rtlrf4fkltelfao3jvcq03p5.apps.googleusercontent.com',
			'offline': true
		}).then( res => {
			firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
			.then( user => {
				this.ingresarProvedor(user.uid, user.displayName, "", user.email,  user.photoURL, "google" );
			})
			.catch( error => console.log("Firebase failure: " + JSON.stringify(error)));
		}).catch(err => console.error("Error: ", err));
	}
	

	signInWithFacebook() {
		if (this.platform.is('cordova')) {
			this.fb.login(['email', 'public_profile']).then(res => {

				const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
				firebase.auth().signInWithCredential(facebookCredential)
				.then(user=>{
					this.ingresarProvedor(user.uid, user.displayName, "", user.email,  user.photoURL, "facebook" );
				}).catch(e=>console.log("Error con el login: ", JSON.stringify(e)));
			})
		}else{
			this.afAuth.auth
			.signInWithPopup(new firebase.auth.FacebookAuthProvider())
			.then(res => {
				let user=res.user;
				this.ingresarProvedor(user.uid, user.displayName, "", user.email,  user.photoURL, "facebook" );
			});
		}
	}

	abrir_registro() {
		let registro = this.modalCtrl.create(RegistroPage);
		registro.onDidDismiss(data => {
			if(data) {
				this.cargar_perfil();
			}
		});
		registro.present();
	}

	cargar_perfil(){
		this.navCtrl.pop();
		this.navCtrl.push(PerfilPage);
	}

	ingresar(){
		if(this._as.online) {
			let loader = this.loadingCtrl.create({
				content: "Validando...",
			});
			loader.present();
			this._us.iniciar_sesion(this.correo, this.password, "", "").subscribe(()=>{
				loader.dismiss();
				if(this._us.si_sesion_iniciada()){
					this.cargar_perfil();
				}

			});
		}else{
			this._as.mostrar_toast("No hay conexion a internet");
		}
	}

	ingresarProvedor(uid: string, nombre:string, apellidos:string, correo:string,  foto:string, provedor:string ){
		let loader = this.loadingCtrl.create({
			content: "Espere un momento...",
		});
		loader.present();
		this._us.iniciar_sesionProvedor(uid, nombre, apellidos, correo,  foto, provedor ).subscribe(()=>{
			loader.dismiss();
			if(this._us.si_sesion_iniciada()){
				this.cargar_perfil();
			}
			
		});
	}


}
