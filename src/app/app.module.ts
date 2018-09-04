import { AngularFireAuth } from 'angularfire2/auth';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { LoginPageModule } from './../pages/login/login.module';
import { ServicosProvider } from './../providers/servicos/servicos';
import { MensagensProvider } from './../providers/mensagens/mensagens';
import { DialogoProvider } from './../providers/dialogo/dialogo';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { PaypalProvider } from '../providers/paypal/paypal';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { FIREBASE_CONFIG } from '../assets/config/firebase.service';
import { IonicStorageModule } from '@ionic/storage';
import { UserDataProvider } from '../providers/user-data/user-data';
import { AuthProvider } from '../providers/auth/auth';
import { DatabaseProvider } from '../providers/database/database';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, { mode: 'md' }),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    LoginPageModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DialogoProvider,
    MensagensProvider,
    ServicosProvider,
    ScreenOrientation,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    PaypalProvider,
    FirebaseProvider,
    AngularFireAuth,
    AngularFireDatabase,
    UserDataProvider,
    AuthProvider,
    DatabaseProvider
  ]
})
export class AppModule { }
