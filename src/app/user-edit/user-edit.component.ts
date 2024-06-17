import { HttpClient } from '@angular/common/http';
import { AuthentificationService } from './../authentification.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  user = {
    rue: '',
    cp: '',
    ville: '',
    email: '',
    tel: ''
  };
formulaire: any;

  constructor(private authentification: AuthentificationService, private router: Router) {}

  ngOnInit() {
   this.user = this.authentification.utilisateur;
  }

  onSubmit(form: NgForm) {
    this.authentification.updateUser(form.value);
    this.router.navigate(['/user-infos']);
  }

}
