import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {


  // updateUser(value: any) {
  //   throw new Error('Method not implemented.');
  // }
  // jwt: string | undefined;
  // role(arg0: string) {
  //   throw new Error('Method not implemented.');
  // }
  // getUserId(
  //   nom = 'nom',
  //   prenom = 'prenom',
  //   email = 'email'
  // ) {
  //   throw new Error('Method not implemented.');
  // }

  utilisateur: any;
  utilisateurConnecte: any;
  updateUser: any;

  constructor() {}

  authentificationAvecJwtLocalStorage() {
    const jwt = localStorage.getItem('jwt');

    if (jwt != null) {
      const splitJwt = jwt.split('.');
      const bodyBase64 = splitJwt[1];
      const bodyJson = window.atob(bodyBase64);
      const body = JSON.parse(bodyJson);

      this.utilisateur = body;
    }
  }

  getUserRole(): number {
    return this.utilisateur ? this.utilisateur.role_id : null;
  }
  

  deconnexion() {
    localStorage.removeItem('jwt');
    this.utilisateur = null;
  }
}
