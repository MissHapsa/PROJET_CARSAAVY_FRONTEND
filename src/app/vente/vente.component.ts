import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-vente',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './vente.component.html',
  styleUrl: './vente.component.scss'
})
export class VenteComponent {
  http: HttpClient = inject(HttpClient);

  listeVente: any[] = [];

  ngOnInit(): void {
    this.http
      .get<any[]>('http://localhost:8080/vente/liste')
      .subscribe((listeVente) => {
        this.listeVente = listeVente;
      }, (error) => {
        console.error('Erreur lors de la récupération de la liste de ventes', error);
      });
  }

  onSupprimerProduit(id: number): void {
    this.http
      .delete('http://localhost:8080/vente/' + id)
      .subscribe((resultat) => {
        console.log(resultat);
       
        this.listeVente = this.listeVente.filter(vente => vente.id !== id);
      }, (error) => {
        console.error('Erreur lors de la suppression du produit', error);
      });
  }

}
