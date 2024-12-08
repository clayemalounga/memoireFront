import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { ServiceEtudiantsService } from '../services/service-etudiants.service';
import { Gestionnaire } from '../models/all-models';

@Component({
  selector: 'app-admin-template',
  templateUrl: './admin-template.component.html',
  styleUrl: './admin-template.component.css'
})
export class AdminTemplateComponent implements OnInit {

  public profileUser!: KeycloakProfile
  public profilUser!: Gestionnaire;
  public email!: string;

  constructor(private keycloakService: KeycloakService, private serviceEt: ServiceEtudiantsService){
  }

  ngOnInit(): void {

    if(this.keycloakService.isLoggedIn()){
      this.keycloakService.loadUserProfile().then(profileUser =>{
        this.profileUser = profileUser
        this.email = this.profileUser.email || ""
        // recuperation du compte de la personne afin de tester son role et mapper les onglet
        if(this.email === "clayemalounga31@gmail.com"){
          // recuperation du gestionnaire
          this.serviceEt.getGestionnaireByEmail(this.email).subscribe({
            next: (value: Gestionnaire)=>{
              this.profilUser = value
            }
          })
        }
      })

      console.log(this.keycloakService.getToken())
    }
    
      
  }

  // la fonction pour la deconnection
  deconnexion(){

    this.keycloakService.logout(window.location.origin);

  }

  // la fonction pour la connexion
  async connexion(){

    await this.keycloakService.login({
      redirectUri:window.location.origin
      
    });


  }
}
