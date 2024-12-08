import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { ServiceEtudiantsService } from '../services/service-etudiants.service';
import { Paiement } from '../models/all-models';

@Component({
  selector: 'app-detail-historique-paiement',
  templateUrl: './detail-historique-paiement.component.html',
  styleUrl: './detail-historique-paiement.component.css'
})
export class DetailHistoriquePaiementComponent implements OnInit {

  id!: number;
  public paiement!: Paiement

  constructor(private activitedRoute: ActivatedRoute, private serviceEt: ServiceEtudiantsService){}

  ngOnInit(): void {
    // recuperation de l'identifiant sur l'uri 
      this.id = this.activitedRoute.snapshot.params['id'];
    // recuperons le paiement dans la base de donnees
    this.serviceEt.getPaiement(this.id).subscribe({
      next: (value: Paiement)=>{
        this.paiement = value;
      }
    })
  }

}
