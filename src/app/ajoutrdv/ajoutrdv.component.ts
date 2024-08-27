import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; // Souvent utilisé avec MatFormField
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';  // Import du FormsModule

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

  listePrestations: any[] = [];
  listeVehicules: any[] = [];

  utilisateur: any = null;
  Id: number = this.authentification.utilisateur.id;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authentification: AuthentificationService
  ) {}

  ngOnInit(): void {
    this.http
      .get<any[]>('http://localhost:8080/prestation/liste')
      .subscribe((listePrestations) => (this.listePrestations = listePrestations));

    this.http
      .get<any[]>(`http://localhost:8080/utilisateur/${this.Id}/vehicules`)
      .subscribe((listeVehicules) => (this.listeVehicules = listeVehicules));

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

          // Accéder directement à la liste des véhicules de l'utilisateur
          this.listeVehicules = utilisateur.vehicules;

          // Si vous souhaitez extraire uniquement les immatriculations
          const immat = this.listeVehicules.map(vehicule => vehicule.immat);
          console.log('Immatriculations:', immat);
        },
        (error) => {
          console.error('Error fetching user information:', error);
        }
      );
}

  onSelectionPrestation(): void {
    if (this.selectedPrestation) {
      console.log('Prestation sélectionnée:', this.selectedPrestation.libelle);
      // Logique supplémentaire pour la prestation sélectionnée si nécessaire
    }
  }

  onSelectionVehicule(): void {
    if (this.selectedVehicule) {
      console.log('Immatriculation du véhicule sélectionné:', this.selectedVehicule.immat);
      // Logique supplémentaire pour le véhicule sélectionné si nécessaire
    }
  }

  onSubmit() {
    if (this.selectedPrestation && this.selectedVehicule && this.dateReservation) {
      const token = this.authentification.utilisateurConnecte;
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      const reservation = {
        dateReservation: this.dateReservation,
        id_prestation: this.selectedPrestation,
        id_vehicule: this.selectedVehicule,
        id_utilisateur: this.Id
      };

      this.http
        .post('http://localhost:8080/reservation', reservation, { headers })
        .subscribe((resultat) => {
          console.log(resultat);
          this.router.navigateByUrl('/mesreservations');
        });
    }
  }
}
