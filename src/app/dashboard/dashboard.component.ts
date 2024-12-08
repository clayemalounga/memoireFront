import { Component, OnInit } from '@angular/core';
import { ServiceEtudiantsService } from '../services/service-etudiants.service';
import { Router } from '@angular/router';
import { KeycloakProfile } from 'keycloak-js';
import { KeycloakService } from 'keycloak-angular';
import { Etudiant } from '../models/all-models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  profilUser!: KeycloakProfile;
  nombrePaiement!: number;
  nombreEtudiant!: number;

  public nombreEtudiants!: Etudiant[];
  constructor(public serviceEt: ServiceEtudiantsService, public route: Router, public keycloack: KeycloakService){
  }
  ngOnInit(): void {
      
    if(this.keycloack.isLoggedIn()){
      this.keycloack.loadUserProfile().then(profilUser =>{
        this.profilUser = profilUser;
      })
    }

    // recuperation du nombre de paiement
    this.serviceEt.getAllPaiementNombre().subscribe({
      next: (value: number)=>{
        this.nombrePaiement = value;
      }
    })

    // recuperation du nombre totale d'etudiants
    this.serviceEt.getAllNombreEtudiant().subscribe({
      next: (value: number)=>{
        this.nombreEtudiant = value
      }
    })

  }

}
