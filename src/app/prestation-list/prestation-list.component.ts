import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthentificationService } from '../authentification.service';


@Component({
  selector: 'app-prestation-list',
  standalone: true,
  imports: [
    MatCardModule,
    HttpClientModule,
    RouterModule,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule

  ],

  templateUrl: './prestation-list.component.html',
  styleUrl: './prestation-list.component.scss'

})
export class PrestationListComponent implements OnInit {
  http: HttpClient = inject(HttpClient);
  authentification = inject(AuthentificationService);


  listePrestation: any[] = [];

  ngOnInit(): void {
    this.http
      .get<any[]>('http://localhost:8080/prestation/liste')
      .subscribe((listePrestation) => {
        this.listePrestation = listePrestation;
      }, (error) => {
        console.error('Erreur lors de la récupération de la liste des prestations', error);
      });
  }

  onSupprimerProduit(id: number): void {
    this.http
      .delete('http://localhost:8080/prestation/' + id)
      .subscribe((resultat) => {
        console.log(resultat);

        this.listePrestation = this.listePrestation.filter(prestation => prestation.id !== id);
      }, (error) => {
        console.error('Erreur lors de la suppression de la prestation', error);
      });
  }
}
