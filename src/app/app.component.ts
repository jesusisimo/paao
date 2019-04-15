import { Component } from '@angular/core';
import { Platform, MenuController, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AjustesProvider } from '../providers/ajustes/ajustes';
import { NotificacionesProvider } from '../providers/notificaciones/notificaciones';
import { Device } from '@ionic-native/device';



import { PrincipalPage,
  TabsPage,
  NotificacionesPage,
  ProfesoresPage,
  ComitePage,
  SalonesPage,
  PaisesPage,
  MinutoxminutoPage,
  LugaresPage,
  LoginPage,
  PatrocinadoresPage,
  IntroduccionPage,
  AcercadePage
} from '../pages/index.paginas';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  tabs = TabsPage;
  principal = PrincipalPage;
  notificaciones = NotificacionesPage;
  profesores = ProfesoresPage;
  comite = ComitePage;
  salones = SalonesPage;
  paises = PaisesPage;
  minutoxminuto = MinutoxminutoPage;
  lugares = LugaresPage;
  login=LoginPage;
  patrocinadores=PatrocinadoresPage;
  introduccion=IntroduccionPage;
  acercade=AcercadePage;


  constructor(platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    private menuCtrl: MenuController,
    private ajustes: AjustesProvider,
    public push: NotificacionesProvider,
    private device: Device,
    private modalCtrl: ModalController    ) {
    platform.ready().then(() => {
      this.ajustes.cargar_extras();
      this.ajustes.cargar_storage()
      .then(()=>{
        if(this.ajustes.ajustes.uuid=="XXXXX"){
          this.ajustes.ajustes.uuid=this.device.uuid;
          this.ajustes.guardar_storage();
        }
        if(this.ajustes.ajustes.mostrar_introduccion){
          this.rootPage = IntroduccionPage;
        }else{
          this.rootPage = TabsPage;
        }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      //llamando notificaciones
      this.push.init_notificaciones();
    });
      
    });
  }

  abrirPagina(pagina:any){
    this.rootPage=pagina;
    this.menuCtrl.close();
  }
  abrir_modal(pagina:any) {
    let modal = this.modalCtrl.create(pagina);
    modal.present();
    this.menuCtrl.close();
  }



}

