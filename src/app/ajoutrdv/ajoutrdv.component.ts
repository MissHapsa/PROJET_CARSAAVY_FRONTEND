import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ajoutrdv',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './ajoutrdv.component.html',
  styleUrls: ['./ajoutrdv.component.scss']
})
export class AjoutrdvComponent implements OnInit {
  selectedPrestation: any;
  selectedVehicule: any;
  dateReservation: string = '';
  selectedCreneau: string = '';
  statut: string = 'En attente';

  listePrestations: any[] = [];
  listeVehicules: any[] = [];

  utilisateur: any = null;
  Id: number;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authentification: AuthentificationService
  ) {
    this.Id = this.authentification.utilisateur.id;
  }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/prestation/liste')
      .subscribe(listePrestations => {
        this.listePrestations = listePrestations;
        console.log('Liste des prestations:', this.listePrestations);

        // Vérification que chaque prestation a bien un ID
        this.listePrestations.forEach(p => {
          if (!p.id) {
            console.error('Prestation sans ID détectée:', p);
          }
        });
      });

    // Récupération des véhicules
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
          this.listeVehicules = utilisateur.vehicules;

          console.log('Liste des véhicules:', this.listeVehicules);

          // Vérification que chaque véhicule a bien un ID
          this.listeVehicules.forEach(v => {
            if (!v.id) {
              console.error('Véhicule sans ID détecté:', v);
            }
          });
        },
        (error) => {
          console.error('Error fetching user information:', error);
        }
      );
  }

  onSelectionPrestation(): void {
    if (this.selectedPrestation && this.selectedPrestation.length > 0 && this.selectedPrestation[0].id) {
      console.log('Prestation sélectionnée avec ID:', this.selectedPrestation[0].id);
    } else {
      console.error('Erreur : L\'ID de la prestation est introuvable.');
    }
  }



  onSelectionVehicule(): void {
    if (this.selectedVehicule && this.selectedVehicule.length > 0 && this.selectedVehicule[0].id) {
      console.log('Véhicule sélectionné avec ID:', this.selectedVehicule[0].id);
    } else {
      console.error('Erreur : L\'ID du véhicule est introuvable.');
    }
  }


  onSubmit() {
    console.log('onSubmit() triggered');

    // Récupérer l'utilisateur connecté dynamiquement depuis le service d'authentification
    const utilisateur = this.authentification.utilisateur;
    console.log('Utilisateur connecté:', utilisateur);

    if (!utilisateur || !utilisateur.id) {
      alert('Erreur : Utilisateur non connecté ou non valide.');
      return;
    }

    // Vérifiez que l'ID du véhicule est bien défini
  if (!this.selectedVehicule || this.selectedVehicule.length === 0 || !this.selectedVehicule[0].id) {
    alert('Veuillez sélectionner un véhicule valide.');
    return;
  }

  // Vérifiez que l'ID de la prestation est bien défini
  if (!this.selectedPrestation || this.selectedPrestation.length === 0 || !this.selectedPrestation[0].id) {
    alert('Veuillez sélectionner une prestation valide.');
    return;
  }

    // Créer l'objet de la réservation avec les données du formulaire et l'ID de l'utilisateur
    const reservationData = {
      utilisateur: { id: utilisateur.id },  // Envoyer uniquement l'ID de l'utilisateur
      vehicule: { id: this.selectedVehicule[0].id },
      prestation: { id: this.selectedPrestation[0].id },  // Envoyer l'ID de la prestation sélectionnée
      dateReservation: this.dateReservation,  // Format YYYY-MM-DD, sélectionné dans le formulaire
      creneau: this.selectedCreneau,          // Format HH:mm:ss, sélectionné dans le formulaire
      statut: 'En attente'  // Statut de la réservation
    };

    console.log('Reservation Data Sent:', reservationData);

    // Construire l'URL du endpoint
    const url = `http://localhost:8080/reservations/utilisateur/${utilisateur.id}`;
    console.log('POST URL:', url);

    // Envoyer la réservation au backend
    this.http.post(url, reservationData)
      .subscribe(
        response => {
          console.log('Réservation ajoutée avec succès', response);
          alert('Rendez-vous ajouté avec succès !');
          this.router.navigateByUrl('/mes-rdv');
        },
        error => {
          console.error('Erreur lors de l\'ajout de la réservation', error);
          alert('Erreur lors de l\'ajout du rendez-vous.');
        }
      );
  }
}
