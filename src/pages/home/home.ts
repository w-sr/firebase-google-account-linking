import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../../app/auth.service';
import { firebaseConfig } from './../../app/app.module';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  username = '';
  password = '';

  constructor(
    public navCtrl: NavController,
    public db: AngularFireDatabase,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private aroute: ActivatedRoute
  ) {
    //console.log(db);
  }

  async signIn() {
    const loading = await this.loadingCtrl.create({
      content: 'Signing you in...'
    });
    loading.present();

    this.authService.signIn(this.username, this.password)
      .then(async (authState) => {
        loading.dismiss();
        console.log("Login-then", authState);

        const token: string = await this.authService.getToken();

        ///////////////////////////////////////////////////////
        ////// Add Code To Redirect with Token to Google //////
        ///////////////////////////////////////////////////////
        let params = this.aroute.snapshot.queryParams;

        let clientID = params.client_id;
        let redirectURI = params.redirect_uri;
        let state = params.state;
        let responseType = params.response_type;
        let linkStatus = true;

        ///////// Validate Parameter Values /////////
        if (clientID != firebaseConfig.clientId) {
          linkStatus = false;
          console.log('clientID is incorrect. ' + clientID);
        }
        if (redirectURI != `https://oauth-redirect.googleusercontent.com/r/${firebaseConfig.projectId}`) {
          linkStatus = false;
          console.log('redirectURI is incorrect. ' + redirectURI);
        }
        if (responseType != 'token') {
          linkStatus = false;
          console.log('responseType is incorrect. ' + responseType);
        }

        ////////// Construct Response + Send Back to Google OAuth ////////
        if (linkStatus) {

          let completeRedirectURI = redirectURI + '#access_token=' + token + '&token_type=bearer&state=' + state;
          location.assign(completeRedirectURI);

        } else {
          const alert = this.alertCtrl.create({
            title: 'Account Link Failed.',
            message: 'Looks like something went wrong.  Please try again.',
            buttons: ['Ok']
          });
          alert.present();
        }
      })
      .catch(
        error => {
          loading.dismiss();
          const alert = this.alertCtrl.create({
            title: 'Login failed.',
            message: error.message,
            buttons: ['Ok']
          });
          alert.present();
        })
  }
}
