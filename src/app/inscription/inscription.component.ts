import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterLink, RouterLinkActive
  ],
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss',
})
export class InscriptionComponent {
  formBuilder: FormBuilder = inject(FormBuilder);
  http: HttpClient = inject(HttpClient);

  formulaire: FormGroup = this.formBuilder.group({
    nom: ['hapsa', [Validators.required]],
    prenom: ['konte', [ Validators.required]],
    rue: ['1 rue de la paix', [Validators.required]],
    ville: ['Paris', [Validators.required]],
    cp: ['75001', [Validators.required]],
    tel: ['0102030405', [Validators.required]],
    email: ['hapsatou@gmail.com', [Validators.email, Validators.required]],
    passeword: ['root', [Validators.required]],

  });

  afficheMotDePasse = false;
  afficheMotDePasseConfirme = false;

  confirmationMotDePasse: string = 'root';

  motDePasseDifferent: boolean = false;
  router: any;

  onInscription(): void {
    this.motDePasseDifferent =
      this.formulaire.get('passeword')?.value != this.confirmationMotDePasse;

      if (this.formulaire.valid && !this.motDePasseDifferent) {
        this.http
          .post('http://localhost:8080/inscription', this.formulaire.value)
          .subscribe(
            (resultat) => {
              alert('Inscription réussie ! Vous pouvez maintenant vous connecter');
              this.router.navigateByUrl('/connexion');
            },
            (error) => {
              alert('Il y a eu une erreur lors de l\'inscription.');
              console.error('There was an error!', error);
            }
          );
      }

  }

  verifierMotDePasseIdentique() {
    if (
      this.formulaire.get('motDePasse')?.value == this.confirmationMotDePasse
    ) {
      this.motDePasseDifferent = false;
    }
  }
}
