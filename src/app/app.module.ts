import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { GestionPaiementsComponent } from './gestion-paiements/gestion-paiements.component';
import { GestionEtudiantsComponent } from './gestion-etudiants/gestion-etudiants.component';
import { AjouterEtudiantsComponent } from './ajouter-etudiants/ajouter-etudiants.component';
import { HistoriquePaiementsComponent } from './historique-paiements/historique-paiements.component';
import{MatToolbarModule } from '@angular/material/toolbar';
import{MatIcon, MatIconModule } from '@angular/material/icon';
import{MatInput, MatInputModule } from '@angular/material/input';
import{MatButton, MatButtonModule } from '@angular/material/button';
import{MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import{MatSort, MatSortModule } from '@angular/material/sort';
import{MatList, MatNavList } from '@angular/material/list';
import{MatListItem } from '@angular/material/list';
import{MatCardModule } from '@angular/material/card';
import{MatTableModule } from '@angular/material/table';
import{MatFormFieldModule } from '@angular/material/form-field';
import{MatSelectModule } from '@angular/material/select';
import{MatPaginatorModule } from '@angular/material/paginator';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DetailEtudiantComponent } from './detail-etudiant/detail-etudiant.component';
import { HomeComponent } from './home/home.component';
import { PaiementEtudiantComponent } from './paiement-etudiant/paiement-etudiant.component';
import { MatListModule } from '@angular/material/list';
import { DetailHistoriquePaiementComponent } from './detail-historique-paiement/detail-historique-paiement.component';
import { ListeEtudiantsNonPayeLeMoisComponent } from './liste-etudiants-non-paye-le-mois/liste-etudiants-non-paye-le-mois.component';


function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080/',
        realm: 'ClayesTrans',
        clientId: 'clayesTrans'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }
      
    });
}

@NgModule({

  declarations: [
    AppComponent,
    AdminTemplateComponent,
    DashboardComponent,
    ProfileComponent,
    GestionPaiementsComponent,
    GestionEtudiantsComponent,
    HistoriquePaiementsComponent,
    AjouterEtudiantsComponent,
    DetailEtudiantComponent,
    HomeComponent,
    PaiementEtudiantComponent,
    DetailHistoriquePaiementComponent,
    ListeEtudiantsNonPayeLeMoisComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatNavList,
    MatListItem,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    KeycloakAngularModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatListModule
    
  ],
  providers: [

    provideAnimationsAsync(),
    
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
