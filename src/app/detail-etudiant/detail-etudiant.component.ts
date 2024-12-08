import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceEtudiantsService } from '../services/service-etudiants.service';
import { Etudiant } from '../models/all-models';

@Component({
  selector: 'app-detail-etudiant',
  templateUrl: './detail-etudiant.component.html',
  styleUrl: './detail-etudiant.component.css'
})
export class DetailEtudiantComponent implements OnInit{

  emailEtudiant! :string;
  etudiantDetails!: Etudiant;

  constructor(public activateRoute: ActivatedRoute, public serviceEt: ServiceEtudiantsService){
  }

  ngOnInit(): void {
    //on recupere l'email que l'on a basculé sur l'url avec le activateRoute
    this.emailEtudiant = this.activateRoute.snapshot.params['email'];

    // consultons le backend pour recuperer l'etudiant
    this.serviceEt.getEtudiantByEmail(this.emailEtudiant).subscribe({
      next: (value: any)=>{
        this.etudiantDetails = value;
      }
    })
    
  }

}
