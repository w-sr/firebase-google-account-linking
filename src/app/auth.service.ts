import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService {

    constructor(
        private afAuth: AngularFireAuth
    ) {
    }

    signIn(username: string, password: string) {
        return this.afAuth.auth.signInWithEmailAndPassword(username, password);
    }

    getCurrentUser() {
        return this.afAuth.authState;
    }

    getToken() {
        return this.afAuth.auth.currentUser.getToken();
    }

    async getUserIdFromToken(token) {
        try {
            const decodedToken: any = await this.afAuth.auth.verifyIdToken(token);
            return decodedToken.uid;
        } catch (error) {
            return false;
        }
    }
}