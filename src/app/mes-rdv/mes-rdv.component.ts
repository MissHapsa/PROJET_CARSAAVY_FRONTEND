import { Component, OnInit, inject } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // Importez CommonModule ici
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-mes-rdv',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule
  ],
  templateUrl: './mes-rdv.component.html',
  styleUrls: ['./mes-rdv.component.scss']})

export class MesRdvComponent implements OnInit {
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);
  authentification = inject(AuthentificationService);

  utilisateur: any = null; // Initialise utilisateur à null
  Id: number = this.authentification.utilisateur.id;
reservations: any;
  i: any;
id: any;


ngOnInit(): void {
  this.getReservationsUtilisateur(this.Id);
}

getReservationsUtilisateur(Id: number): void {
  const token = this.authentification.utilisateurConnecte;
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  this.http
    .get<any[]>(`http://localhost:8080/reservations/utilisateur/${Id}`, { headers })
    .subscribe(
      (reservations) => {
        console.log(reservations);  // Debug: vérifier les réservations récupérées
        this.reservations = reservations;
      },
      (error) => {
        console.error('Erreur lors de la récupération des réservations:', error);
      }
    );
}
}
