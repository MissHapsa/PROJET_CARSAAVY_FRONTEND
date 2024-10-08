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
  selector: 'app-vehicules-list',
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
  templateUrl: './vehicules-list.component.html',
  styleUrl: './vehicules-list.component.scss'
})
export class VehiculesListComponent implements OnInit {
  http: HttpClient = inject(HttpClient);
  authentification = inject(AuthentificationService);


  listeVehicule: any[] = [];

  ngOnInit(): void {
    this.http
      .get<any[]>('http://localhost:8080/vehicule/liste')
      .subscribe((listeVehicule) => {
        this.listeVehicule = listeVehicule;
      }, (error) => {
        console.error('Erreur lors de la récupération de la liste des prestations', error);
      });
  }

  onSupprimerProduit(id: number): void {
    this.http
      .delete('http://localhost:8080/prestation/' + id)
      .subscribe((resultat) => {
        console.log(resultat);

        this.listeVehicule = this.listeVehicule.filter(vehicule => vehicule.id !== id);
      }, (error) => {
        console.error('Erreur lors de la suppression de la prestation', error);
      });
  }

  getPrestations(): any[] {
    return this.listeVehicule;
  }
}
