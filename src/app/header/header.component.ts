import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  getProfilRoute(): string {
    const roleId = this.authentification.getUserRole();

    switch (roleId) {
      case 1:
        return '/dashboard';  // Admin
      case 2:
        return '/profil-technicien';  // Technicien
      case 3:
        return '/accueil';  // Client
      default:
        return '/accueil';  // Redirection par défaut si le rôle n'est pas reconnu
    }
  }

  authentification = inject(AuthentificationService);
  router = inject(Router);

  onDeconnexion() {
    this.authentification.deconnexion();
    this.router.navigateByUrl('/connexion');
  }
}
