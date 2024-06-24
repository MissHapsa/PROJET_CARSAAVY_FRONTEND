import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AuthentificationService } from "../authentification.service";
import { MatButton } from "@angular/material/button";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatOption } from "@angular/material/autocomplete";
import { MatSelect } from "@angular/material/select";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-edit-profil',
  standalone: true,
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.scss']
})
export class EditProfilComponent implements OnInit {
  http: HttpClient = inject(HttpClient);
  authentification = inject(AuthentificationService);
  formBuilder: FormBuilder = inject(FormBuilder);
  route: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);

  formulaire: FormGroup = this.formBuilder.group({
    email: [this.authentification.utilisateur.sub, [Validators.required, Validators.email]],
    nom: [this.authentification.utilisateur.nom, [Validators.required]],
    prenom: [this.authentification.utilisateur.prenom, [Validators.required]],
    tel: [this.authentification.utilisateur.tel, [Validators.required]],
    rue: [this.authentification.utilisateur.rue, [Validators.required]],
    ville: [this.authentification.utilisateur.ville, [Validators.required]],
    cp: [this.authentification.utilisateur.cp, [Validators.required]],
    passeword: [this.authentification.utilisateur.passeword] // Mot de passe actuel
  });

  id: number = this.authentification.utilisateur.id;

  ngOnInit(): void {
    console.log(this.id);
  }

  onSubmit() {
    console.log(this.id);
    if (this.formulaire.valid) {
      if (this.id) {
        this.http
          .put(
            'http://localhost:8080/utilisateur/' + this.id,
            this.formulaire.value
          )
          .subscribe(
            (resultat) => this.router.navigateByUrl('/accueil'),
            (error) => console.error('There was an error!', error)
          );
      } else {
        this.http
          .post('http://localhost:8080/utilisateur', this.formulaire.value)
          .subscribe(
            (resultat) => this.router.navigateByUrl('/accueil'),
            (error) => console.error('There was an error!', error)
          );
      }
    }
  }
}
