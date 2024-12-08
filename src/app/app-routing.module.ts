import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { GestionEtudiantsComponent } from './gestion-etudiants/gestion-etudiants.component';
import { HistoriquePaiementsComponent } from './historique-paiements/historique-paiements.component';
import { GestionPaiementsComponent } from './gestion-paiements/gestion-paiements.component';
import { AjouterEtudiantsComponent } from './ajouter-etudiants/ajouter-etudiants.component';
import {AutoGuard} from "./auth/auto-guard.guard";
import { DetailEtudiantComponent } from './detail-etudiant/detail-etudiant.component';
import { HomeComponent } from './home/home.component';
import { PaiementEtudiantComponent } from './paiement-etudiant/paiement-etudiant.component';
import { DetailHistoriquePaiementComponent } from './detail-historique-paiement/detail-historique-paiement.component';
import { ListeEtudiantsNonPayeLeMoisComponent } from './liste-etudiants-non-paye-le-mois/liste-etudiants-non-paye-le-mois.component';


const routes: Routes = [

  {
    path: "dashboard", component: DashboardComponent, canActivate: [AutoGuard]
  },
  {
    path: "profile", component: ProfileComponent, canActivate: [AutoGuard]
  },
  {
    path: "gestionEtudiants", component: GestionEtudiantsComponent, canActivate: [AutoGuard]
  },
  {
    path: "historiquePaiements", component: HistoriquePaiementsComponent, canActivate: [AutoGuard]
  },
  {
    path: "gestionPaiements", component: GestionPaiementsComponent, canActivate: [AutoGuard]
  },
  {
    path: "ajouterEtudiant", component: AjouterEtudiantsComponent, canActivate: [AutoGuard]
  },
  {
    path: "detailEtudiant/:email", component: DetailEtudiantComponent, canActivate: [AutoGuard]
  },
  {
    path: "", component: HomeComponent
  },
  {
    path: "paiementEtudiant/:email", component: PaiementEtudiantComponent, canActivate: [AutoGuard]
  },
  {
    path:"detailPaiementEtudiant/:id", component: DetailHistoriquePaiementComponent, canActivate: [AutoGuard]
  },
  {
    path:"list-etudiant-non-payer", component:ListeEtudiantsNonPayeLeMoisComponent, canActivate: [AutoGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
