import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  utilisateur: any;

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

  deconnexion() {
    localStorage.removeItem('jwt');
    this.utilisateur = null;
  }
}
