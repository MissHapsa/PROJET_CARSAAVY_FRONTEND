import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AuthentificationService } from './authentification.service';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { PrestationListComponent } from './prestation-list/prestation-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, HeaderComponent, MatCardModule, HttpClientModule, PrestationListComponent],
})
export class AppComponent {
  title = 'GARAGE CAR SAVVY';

  authentification = inject(AuthentificationService);

  ngOnInit() {
    this.authentification.authentificationAvecJwtLocalStorage();
  }
}
