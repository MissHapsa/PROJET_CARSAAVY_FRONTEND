import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterLink,
  ],
  templateUrl: './connexion.component.html',
  styleUrl: './connexion.component.scss',
})
export class ConnexionComponent {
  formBuilder: FormBuilder = inject(FormBuilder);
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);
  authentification = inject(AuthentificationService);

  formulaire: FormGroup = this.formBuilder.group({
    email: ["lorem@outlook.sn", [Validators.email, Validators.required]],
    passeword: ['', [Validators.required]],
  });

  erreurConnexion: boolean = false;

  onConnexion() {
    if (this.formulaire.valid) {
      this.http
        .post<{ jwt: string, role_id: number }>(
          'http://localhost:8080/connexion',
          this.formulaire.value
        )
        .subscribe({
          next: (resultat) => {
            localStorage.setItem('jwt', resultat.jwt);
            localStorage.setItem('role_id', resultat.role_id.toString());  // Stockez le rôle de l'utilisateur
            this.authentification.authentificationAvecJwtLocalStorage();

            // Redirection basée sur le rôle
            switch (resultat.role_id) {
              case 1:  // Admin
                this.router.navigateByUrl('/dashboard');
                break;
              case 2:  // Technicien
                this.router.navigateByUrl('/profil-technicien');
                break;
              case 3:  // Client
                this.router.navigateByUrl('/accueil');
                break;
              default:
                this.router.navigateByUrl('/home');
                break;
            }
          },
          error: (reponse) => {
            this.erreurConnexion = true;
          },
        });
    }
  }
  
}
