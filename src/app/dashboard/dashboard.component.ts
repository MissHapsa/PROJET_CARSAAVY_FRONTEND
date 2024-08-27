import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  http: HttpClient = inject(HttpClient);
  AuthentificationService: AuthentificationService = inject(AuthentificationService);


  isAdmin: boolean = false;

  constructor(public authentification: AuthentificationService) {}

  ngOnInit(): void {
    this.checkUserRole();
  }

  checkUserRole(): void {
    const role = this.authentification.getUserRole();
    this.isAdmin = role === 1;  // Si role_id = 1 alors c'est un admin
  }
}
