import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from "ionic-angular";
import { Network } from '@ionic-native/network';
import { Toast } from '@ionic-native/toast';
import { URL_SERVICIOS } from "../../config/url.servicios";
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AjustesProvider {

	ajustes = {
		mostrar_introduccion: true,
    uuid: "XXXXX"
  }
  online:boolean=true;
  extras:any[]=[];

  constructor( private platform : Platform,
    private storage: Storage,
    private network: Network,
    private toast: Toast,
    public http: Http) {
    this.checkConexion();
  }

  cargar_storage(){
    let promesa = new Promise(  ( resolve, reject )=>{
      if(  this.platform.is("cordova")   ){
        console.log("Inicializando storage");
        this.storage.ready()
        .then( ()=>{
        	console.log("Storage listo");
        	this.storage.get("ajustes")
        	.then( ajustes=>{
        		if( ajustes ){
        			this.ajustes = ajustes;
        		}
        		resolve();
        	});
        })
      }else{
        if( localStorage.getItem("ajustes")  ){
        	this.ajustes = JSON.parse( localStorage.getItem("ajustes") );
        }
        resolve();
      }
    });
    return promesa;
  }


  guardar_storage(){
    if(  this.platform.is("cordova")   ){
      this.storage.ready()
      .then( ()=>{
      	this.storage.set( "ajustes", this.ajustes );
      })
    }else{
      localStorage.setItem("ajustes", JSON.stringify(this.ajustes) );
    }
  }


  checkConexion(){

    console.log("Revisando");

    if( this.platform.is('cordova') ) {
      if( this.network.type === undefined || this.network.type === null || this.network.type === 'unknown') {
        this.online=false;
        console.log('No hay conexion a internet');
      } else {
        this.online=true;
        console.log('Si hay conexion a internet');
      }
    } else {
      this.online=navigator.onLine;
      console.log('Si hay conexion a internet');
    }
    

    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('No hay conexion a internet');
      this.online=false;
    });
    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      this.online=true;
    });

  }

  mostrar_toast(mensaje:string){
    this.toast.show(mensaje, '5000', 'center').subscribe(
      toast => {
        console.log(toast);
      }
      );
  }

  cargar_extras(){
    let promesa = new Promise( (resolve, reject)=>{
      let url=URL_SERVICIOS + "/extras.php";
      this.http.get(url)
      .map( resp => resp.json())
      .subscribe(data => {
        if(data.error) {

        }else{
          this.extras.push(...data.extras);
        }
        resolve();

      })
    });
    return promesa;
  }

}
