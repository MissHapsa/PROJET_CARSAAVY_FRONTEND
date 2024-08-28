import {Component, inject, OnInit} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import { AuthentificationService } from '../authentification.service';



@Component({
  selector: 'app-ajoutvehicule',
  standalone: true,
    imports: [
        MatButton,
        MatFormField,
        MatInput,
        MatLabel,
        MatOption,
        MatSelect,
        ReactiveFormsModule,
        FormsModule,
        MatError,
        MatIcon,
        MatIconButton,
        MatSuffix

    ],
  templateUrl: './ajoutvehicule.component.html',
  styleUrl: './ajoutvehicule.component.scss'
})
export class AjoutVehiculeComponent implements OnInit {
  formBuilder: FormBuilder = inject(FormBuilder);
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);
  authentification = inject(AuthentificationService);
  route: ActivatedRoute = inject(ActivatedRoute);


  formulaire: FormGroup = this.formBuilder.group({
    immat: ['', [Validators.required]],
    annee: ['', [Validators.required]],
  });

  listeMarque: any[] = [];
  listeModele: any[] = [];
  listeModeleFiltre: any[] = [];



  selectedMarque: any = null;
  selectedModele: any = null;
  utilisateur: any = null;
  Id: number = this.authentification.utilisateur.id;


  ngOnInit(): void {
    this.http
      .get<any[]>('http://localhost:8080/marque')
      .subscribe((listeMarque) => (this.listeMarque = listeMarque));
    this.http
      .get<any[]>('http://localhost:8080/modele')
      .subscribe((listeModele) => (this.listeModele = listeModele));

      this.getUtilisateurInfo(this.Id);

  }

  onSelectionMarque() {
    if (this.selectedMarque) {
      this.listeModeleFiltre = this.listeModele.filter(model => model.marque.nom === this.selectedMarque.nom);
    }
  }


  getUtilisateurInfo(Id: number): void {
    const token = this.authentification.utilisateur;
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
  onSubmit() {
    console.log(this.formulaire);
    if (this.formulaire.valid) {

      // Récupération du token d'authentification
      const token = this.authentification.utilisateur;

      if (!token) {
        alert('Erreur : Vous devez être connecté pour ajouter un véhicule.');
        return;
      }

      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      const vehicule = {
        immat: this.formulaire.value.immat,
        annee: this.formulaire.value.annee,
        modele: this.selectedModele,  // Inclure l'objet `selectedModele`
        utilisateur: { id: this.Id }  // Inclure l'ID de l'utilisateur connecté
      };

      const url = `http://localhost:8080/vehicule/utilisateur/${this.Id}`;

      this.http
        .post(url, vehicule, { headers })
        .subscribe(
          (resultat) => {
            console.log('Véhicule ajouté avec succès:', resultat);
            this.router.navigateByUrl('/mesvehicules');
          },
          (error) => {
            console.error('Erreur lors de l\'ajout du véhicule:', error);
            alert('Une erreur est survenue lors de l\'ajout du véhicule.');
          }
        );
    }
  }



}
