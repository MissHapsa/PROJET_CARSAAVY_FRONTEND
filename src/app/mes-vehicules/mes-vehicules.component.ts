import { Component, OnInit, inject } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Importez CommonModule ici
import { NgModule } from '@angular/core';


@Component({
  selector: 'app-mes-vehicules',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule // Assurez-vous que CommonModule est importé ici
  ],
  templateUrl: './mes-vehicules.component.html',
  styleUrls: ['./mes-vehicules.component.scss']
})

export class MesVehiculesComponent implements OnInit {
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);
  authentification = inject(AuthentificationService);

  utilisateur: any = null; // Initialise utilisateur à null
  Id: number = this.authentification.utilisateur.id;
listeVehicule: any;
i: any;

  ngOnInit(): void {
    this.getUtilisateurInfo(this.Id);
  }

  getUtilisateurInfo(Id: number): void {
    const token = this.authentification.utilisateurConnecte;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .get<any>(`http://localhost:8080/utilisateur/${Id}`, { headers })
      .subscribe(
        (utilisateur) => {
          this.utilisateur = utilisateur;
        },
        (error) => {
          console.error('Error fetching user information:', error);
        }
      );
  }

  supprimerVehicule(id: number): void {
    const token = this.authentification.utilisateurConnecte;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.delete(`http://localhost:8080/vehicule/${id}`, { headers })
    .subscribe(
        (data) => {
          this.getUtilisateurInfo(this.Id);
          alert('Vehicule supprimé avec succès');
        },
        (error) => {
          console.error('Error deleting user information:', error);
        }
      );
  }
}
