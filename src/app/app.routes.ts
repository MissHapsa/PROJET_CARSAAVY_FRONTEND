import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { PageNonTrouveComponent } from './page-non-trouve/page-non-trouve.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { userGuard } from './user.guard';
import { adminGuard } from './admin.guard';
import { ProfilComponent } from './profil/profil.component';
import {VenteComponent} from "./vente/vente.component";
import { HomeComponent } from './home/home.component';
import { PrestationListComponent } from './prestation-list/prestation-list.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

export const routes: Routes = [
  { path: 'accueil', component: AccueilComponent, canActivate: [userGuard] },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'prestation-list', component: PrestationListComponent },
  { path: 'vente', component: VenteComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profil', component: ProfilComponent, canActivate: [userGuard] },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: '**', component: PageNonTrouveComponent }

];
