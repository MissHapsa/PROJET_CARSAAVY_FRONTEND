import { AjoutVehiculeComponent } from './ajoutvehicule/ajoutvehicule.component';
import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { PageNonTrouveComponent } from './page-non-trouve/page-non-trouve.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { userGuard } from './user.guard';
import { adminGuard } from './admin.guard';
import { ProfilComponent } from './profil/profil.component';
import {VenteComponent} from "./vente/vente.component";
import { MaterielComponent } from './materiel/materiel.component';
import { HomeComponent } from './home/home.component';
import { PrestationListComponent } from './prestation-list/prestation-list.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { MesVehiculesComponent } from './mes-vehicules/mes-vehicules.component';
import { UserInfosComponent } from './userinfos/userinfos.component';
import {EditProfilComponent} from "./edit-profil/edit-profil.component";

export const routes: Routes = [
  { path: 'accueil', component: AccueilComponent, canActivate: [userGuard] },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'prestation-list', component: PrestationListComponent },
  { path: 'vente', component: VenteComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profil', component: ProfilComponent, canActivate: [userGuard] },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: 'mes-vehicules', component: MesVehiculesComponent, canActivate: [userGuard] },
  { path: 'userinfos', component: UserInfosComponent, canActivate: [userGuard] },
  { path: 'materiel', component: MaterielComponent },
  { path: 'ajoutvehicule', component: AjoutVehiculeComponent , canActivate: [ userGuard] },
  { path: 'edit-profil', component: EditProfilComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNonTrouveComponent }
];
