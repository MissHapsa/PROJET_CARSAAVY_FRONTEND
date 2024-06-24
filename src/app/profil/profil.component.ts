import { Component, inject, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent implements OnInit {
  http: HttpClient = inject(HttpClient);
  authentification = inject(AuthentificationService);
  utilisateurConnecte: any;

  ngOnInit(): void {
    this.recupererUtilisateurConnecte();
  }
  recupererUtilisateurConnecte(): void {
    this.http
     .get<{ utilisateur: any }>(
        'http://localhost:8080/utilisateur/' + this.authentification.utilisateur.id
      )
     .subscribe((utilisateur) => {
        this.utilisateurConnecte = utilisateur.utilisateur;
      }, (error) => {
        console.error('Erreur lors de la récupération de l\'utilisateur', error);
      });

  }}

