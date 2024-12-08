import { Component, OnInit } from '@angular/core';
import { ServiceEtudiantsService } from '../services/service-etudiants.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EcheancierPaiement } from '../models/all-models';
import { of } from 'rxjs';

@Component({
  selector: 'app-liste-etudiants-non-paye-le-mois',
  templateUrl: './liste-etudiants-non-paye-le-mois.component.html',
  styleUrl: './liste-etudiants-non-paye-le-mois.component.css'
})
export class ListeEtudiantsNonPayeLeMoisComponent implements OnInit{

  public rechercheEt!: FormGroup;
  public eheanceImpayerMoi!: EcheancierPaiement[];
  public mois!: string;
  constructor(private serviceEt: ServiceEtudiantsService){

  }


  ngOnInit(): void {
      this.rechercheEt = new FormGroup({
      recherche: new FormControl('',Validators.required),
      });
  }
  // 
  sendRecherche(){
    // recuperation des valeurs pour les etudiants
    console.log(this.rechercheEt.value)
    this.mois = this.rechercheEt.value;
    console.log(this.mois)
    this.serviceEt.getAllMoisNotPaiement().subscribe({
      next: (value: EcheancierPaiement[])=>{
        console.log(value)
        console.log( this.eheanceImpayerMoi)
      }
    })
    
  }

}
