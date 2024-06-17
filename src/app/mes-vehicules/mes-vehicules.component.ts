import { Component, Inject, OnInit, inject, } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { RouterLink, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mes-vehicules',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './mes-vehicules.component.html',
  styleUrls: ['./mes-vehicules.component.scss'],
})
export class MesVehiculesComponent implements OnInit {
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);
  authentification = inject(AuthentificationService);

  utilisateur: any = null; // Initialise utilisateur à null
  Idutilisateur: number = this.authentification.utilisateur.id;

  ngOnInit(): void {
    console.log(this.utilisateur);
    this.getUtilisateurInfo(this.Idutilisateur);
    console.log('Utilisateur :', this.utilisateur);
  }

  getUtilisateurInfo(id: number): void {
    // Ajoutez les en-têtes d'authentification si nécessaire
    const token = this.authentification.authentificationAvecJwtLocalStorage(); // Assurez-vous d'avoir une méthode pour récupérer le token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .get<any>(`http://localhost:8080/utilisateur/${id}`, { headers })
      .subscribe(
        (utilisateur) => {
          this.utilisateur = utilisateur;

        },
        (error) => {
          console.error('Error fetching user information:', error);
        }
      );
  }
}
