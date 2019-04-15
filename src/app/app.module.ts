import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { IonicStorageModule } from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal';
import { Device } from '@ionic-native/device';
import { Toast } from '@ionic-native/toast';
//facebook
import { Facebook } from '@ionic-native/facebook';
//google plus falta clave de produccion
import { GooglePlus } from '@ionic-native/google-plus';
//internet
import { Network } from '@ionic-native/network';
//firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
//maps
import { AgmCoreModule } from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
//geolocalizacion
import { Geolocation } from '@ionic-native/geolocation';
export const firebaseConfig = {
  apiKey: "AIzaSyAifPFL8fYD5RtcHczddU6TeM3tCJcXkD0",
  authDomain: "app-somera.firebaseapp.com",
  databaseURL: "https://app-somera.firebaseio.com",
  projectId: "app-somera",
  storageBucket: "app-somera.appspot.com",
  messagingSenderId: "843018529443"
};


import { 
  PrincipalPage,
  TabsPage,
  NotificacionesPage,
  ProfesoresPage,
  ComitePage,
  SalonesPage,
  PaisesPage,
  MinutoxminutoPage,
  LugaresPage,
  ProfesordetallePage,
  LoginPage,
  PatrocinadoresPage,
  PatrocinadorPage,
  IntroduccionPage,
  PerfilPage,
  NotificacionPage,
  RegistroPage,
  VotacionPage,
  ActividadPage,
  WebPage,
  AcercadePage
} from '../pages/index.paginas';

import { ProfesoresProvider } from '../providers/profesores/profesores';
import { PatrocinadoresProvider } from '../providers/patrocinadores/patrocinadores';
import { ComitesProvider } from '../providers/comites/comites';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { AjustesProvider } from '../providers/ajustes/ajustes';
import { NotificacionesProvider } from '../providers/notificaciones/notificaciones';
import { LugaresProvider } from '../providers/lugares/lugares';
import { UbicacionProvider } from '../providers/ubicacion/ubicacion';
import { VotacionProvider } from '../providers/votacion/votacion';
import { ActividadesProvider } from '../providers/actividades/actividades';
import { PaisesProvider } from '../providers/paises/paises';


@NgModule({
  declarations: [
  MyApp,
  PrincipalPage,
  TabsPage,
  NotificacionesPage,
  ProfesoresPage,
  ComitePage,
  SalonesPage,
  PaisesPage,
  MinutoxminutoPage,
  LugaresPage,
  ProfesordetallePage,
  LoginPage,
  PerfilPage,
  PatrocinadoresPage,
  IntroduccionPage,
  PatrocinadorPage,
  NotificacionPage,
  RegistroPage,
  VotacionPage,
  ActividadPage,
  WebPage,
  AcercadePage
  ],
  imports: [
  BrowserModule,
  HttpModule,
  IonicModule.forRoot(MyApp,{backButtonText:'Atras'}),
  IonicStorageModule.forRoot({name: '__appevent',driverOrder: ['indexeddb', 'sqlite', 'websql']}),
  AngularFireModule.initializeApp(firebaseConfig),
  AngularFireDatabaseModule,
  AngularFireAuthModule,
  AgmCoreModule.forRoot({
    apiKey: 'AIzaSyC-4M9bYMqK1gRkrIeF7E5vRXG0aC31ivE'
  }),
  AgmJsMarkerClustererModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
  MyApp,
  PrincipalPage,
  TabsPage,
  NotificacionesPage,
  ProfesoresPage,
  ComitePage,
  SalonesPage,
  PaisesPage,
  MinutoxminutoPage,
  LugaresPage,
  ProfesordetallePage,
  LoginPage,
  PerfilPage,
  PatrocinadoresPage,
  IntroduccionPage,
  PatrocinadorPage,
  NotificacionPage,
  RegistroPage,
  VotacionPage,
  ActividadPage,
  WebPage,
  AcercadePage
  ],
  providers: [
  StatusBar,
  SplashScreen,
  {provide: ErrorHandler, useClass: IonicErrorHandler},
  ProfesoresProvider,
  InAppBrowser,
  PatrocinadoresProvider,
  ComitesProvider,
  UsuarioProvider,
  AjustesProvider,
  OneSignal,
  Device,
  NotificacionesProvider,
  Facebook,
  GooglePlus,
  Network,
  Toast,
  Geolocation,
  AjustesProvider,
  LugaresProvider,
  UbicacionProvider,
  VotacionProvider,
  ActividadesProvider,
  PaisesProvider    ]
})
export class AppModule {}
