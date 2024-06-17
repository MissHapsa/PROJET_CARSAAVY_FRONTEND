import {Component, inject, OnInit} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import { Router} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import { RouterLink, RouterLinkActive } from '@angular/router';
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
        MatSuffix,
        RouterLink, RouterLinkActive
    ],
  templateUrl: './ajoutvehicule.component.html',
  styleUrl: './ajoutvehicule.component.scss',
})
export class AjoutVehiculeComponent implements OnInit {
  formBuilder: FormBuilder = inject(FormBuilder);
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);

  formulaire: FormGroup = this.formBuilder.group({
    plaqueVoiture: ['', [Validators.required]],
  });
  listeMarque: any[] = [];
  listeModele: any[] = [];
  listeModeleFiltre: any[] = [];

  selectedMarque: any = null;
  selectedModele: any = null;
  authentification: any;
  utilisateurConnecte: any;

  constructor(private authentificationService: AuthentificationService) { }

  ngOnInit(): void {
    this.http
      .get<any[]>('http://localhost:8080/marque/liste')
      .subscribe((listeMarque) => (this.listeMarque = listeMarque));
    this.http
      .get<any[]>('http://localhost:8080/modele/liste')
      .subscribe((listeModele) => (this.listeModele = listeModele));
  }

  onSelectionMarque() {
    this.listeModeleFiltre = this.listeModele.filter(modele => modele.marque.nom == this.selectedMarque.nom)
  }
  recupererUtilisateurConnecte(): void {
    this.http
      .get<{ utilisateur: any }>(
        'http://localhost:8080/utilisateur/' + this.authentification.authentificationAvecJwtLocalStorage()
      )
      .subscribe((utilisateur) => {
        this.utilisateurConnecte = utilisateur.utilisateur;
      }, (error) => {
        console.error('Erreur lors de la récupération de l\'utilisateur', error);
      });
  }

  onSubmit() {
    console.log(this.formulaire);
    if (this.formulaire.valid) {

      const vehicule = this.formulaire.value;
      vehicule.idModeleVoiture = this.selectedModele

      this.http
        .post('http://localhost:8080/vehicule', this.formulaire.value)
        .subscribe((resultat) => {
          alert('Enregistrement effectué');
        })
      this.router.navigate(['/mes-vehicules']);
    }
  }
}
