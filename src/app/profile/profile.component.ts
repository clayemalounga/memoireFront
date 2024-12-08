import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { getLocaleDateFormat } from '@angular/common';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { ServiceEtudiantsService } from '../services/service-etudiants.service';
import { Etudiant, Gestionnaire, Paiement } from '../models/all-models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit,AfterViewInit {

  public dataSource: any;
  public students: any;
  public displayedColumns: string[] = ["id","montant","status","date"]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: Sort;
  private _liveAnnouncer = inject(LiveAnnouncer);

  public profilUser!: KeycloakProfile;
  public email!: string;
  public userValideGest!: Gestionnaire;
  public userValideEtu!: Etudiant;

  public listPaiement!: Paiement[]
  public listPaiementEt!: Paiement[] 

  constructor(public router: Router, public Keycloack: KeycloakService, public serviceUser: ServiceEtudiantsService) {
  }

  ngOnInit(): void {
    if(this.Keycloack.isLoggedIn()){
      this.Keycloack.loadUserProfile().then(profilUser =>{
        this.profilUser = profilUser;
        this.email = profilUser.email || "";
        //console.log(this.email+" email de la personne connecter")
        // testons si c'est un gestionnaire ou bien un etudiant pour recuperer 
        if(this.email === "clayemalounga31@gmail.com"){
          this.serviceUser.getGestionnaireByEmail(this.email).subscribe({
            next: (value: Gestionnaire) =>{
              this.userValideGest = value;
              //console.log( this.userValideGest);
              // recuperation des paiements gestionnaire
              this.serviceUser.getAllPaiement().subscribe({
                next: (value: Paiement[])=>{
                  this.listPaiement = value;
                }
              })
            }
          })
        }else{
          // recuperation de l'etudiant
          this.serviceUser.getEtudiantByEmail(this.email).subscribe({
            next: (value: Etudiant) =>{
              this.userValideEtu = value;
              //console.log( this.userValideGest);

              //recuperation des paiements d'un etudiant
              this.serviceUser.getAllPaiementEtudiant(this.email).subscribe({
                next: (value: Paiement[])=>{
                  this.listPaiementEt = value
                  console.log(value)
                }
              })
            }
          })
        }

      }) 
    }

    // recuperons l'utilisateur depuis l'endpoint en fonction du role si c'est l'etudiant
    this.students = [];

    for (let i = 1; i <= 20; i++) {
      this.students.push({

        id: i,
        montant: (Math.random()*5000),
        status: "payé",
        date: Date()
      })

    }
    this.dataSource = new MatTableDataSource(this.students);
  }

  ngAfterViewInit(): void {

    
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

  announceSortChange(event: Sort) {

    if (event.direction) {
      this. _liveAnnouncer.announce(`Sorted ${event.direction}ending`);
    } else {
      this. _liveAnnouncer.announce('Sorting cleared');
    }

  }

  paiementEtudiantOperateur(email: string){
    // on part sur l'interface ou on fait le paiement
    return this.router.navigateByUrl("paiementEtudiant/"+email);

  }
}
