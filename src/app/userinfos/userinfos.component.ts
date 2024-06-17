import { Component, inject, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-userinfos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './userinfos.component.html',
  styleUrl: './userinfos.component.scss'
})
export class UserInfosComponent implements OnInit {
  http: HttpClient = inject(HttpClient);
  authentification = inject(AuthentificationService);
  utilisateurConnecte: any;

  ngOnInit(): void {
    
  }


  }

