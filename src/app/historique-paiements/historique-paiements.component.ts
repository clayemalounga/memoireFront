import { Component, OnInit } from '@angular/core';
import { ServiceEtudiantsService } from '../services/service-etudiants.service';
import { PaiementEtudiantComponent } from '../paiement-etudiant/paiement-etudiant.component';
import { Paiement } from '../models/all-models';
import { Route, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-historique-paiements',
  templateUrl: './historique-paiements.component.html',
  styleUrl: './historique-paiements.component.css'
})
export class HistoriquePaiementsComponent implements OnInit {

  public email!: string
  public profile!: KeycloakProfile
  public listPaiement!: Paiement[];
  public listPaiementEt!: Paiement[]
  public paiements!: Paiement[];
  constructor(private serviceEt: ServiceEtudiantsService, private router: Router, private keycloak: KeycloakService ) {

  }

  ngOnInit(): void {

    if(this.keycloak.isLoggedIn()){
      this.keycloak.loadUserProfile().then(profile =>{
        this.email = profile.email || ""

        // testons si l'utilisateur est un gestionnaire 
        if(this.email ==="clayemalounga31@gmail.com"){
          // recuperons tous les historiques de paiement
          this.serviceEt.getAllPaiement().subscribe({
            next: (value: Paiement[])=>{
              this.listPaiement = value;
            }
          })
        }else{
          //recuperons les paiements de l'etudiant
          this.serviceEt.getAllPaiementEtudiant(this.email).subscribe({
            next: (value: Paiement[])=>{
              this.listPaiementEt = value
              console.log(value);
            }
          })
        }
      })

    }
    

  }

  // la fonction qui permet de selectionner un paiement
  detailPaiement(p: Paiement){
    this.router.navigateByUrl("/detailPaiementEtudiant/"+p.id);
  }
}
