import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './auth.service';
import { RouterModule, Routes } from '@angular/router';

// export const firebaseConfig = {
//   /// Update with firebase config
//   apiKey: "AIzaSyBBstqbOiijafpxjNPgraldr9VNf3Q6XXI",
//   authDomain: "testoauth-eec30.firebaseapp.com",
//   databaseURL: "https://testoauth-eec30.firebaseio.com",
//   projectId: "testoauth-eec30",
//   storageBucket: "",
//   messagingSenderId: "15798374201",
//   appId: "1:15798374201:web:5da4657127b95ae6",
//   clientId: "15798374201-k7mgr4jvmjstnvrjefe39dnu8l51s77n.apps.googleusercontent.com",
//   secretKey: "TRQwfDtt-Q4vW070VoooQjP8"
// };

export const firebaseConfig = {
  apiKey: "AIzaSyCIjQTcaOHauEr1WCfupPLHn-c_TzGO-bY",
  authDomain: "ionic-test-793a5.firebaseapp.com",
  databaseURL: "https://ionic-test-793a5.firebaseio.com",
  projectId: "ionic-test-793a5",
  storageBucket: "",
  messagingSenderId: "720703103071",
  appId: "1:720703103071:web:f4114d03c2bf4e60",
  clientId: "720703103071-9j5upnq9v3p608g5rfi76gq2rm61mg3n.apps.googleusercontent.com",
  // secretKey: "rQc9YFadSZHKGFDfmJKKFriA"
  secretKey: "9oi-j-ABheUA4gcUtHUh6Ear"
};
const routes: Routes = [
  { path: '', component: HomePage }
]

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(routes)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
