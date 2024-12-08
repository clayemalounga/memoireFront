import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import { ServiceEtudiantsService } from '../services/service-etudiants.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Etudiant, Filiere, SalleClasse } from '../models/all-models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter-etudiants',
  templateUrl: './ajouter-etudiants.component.html',
  styleUrl: './ajouter-etudiants.component.css'
})
export class AjouterEtudiantsComponent implements OnInit {


  public dataSource: any;
  public students: any;
  public displayedColumns: string[] = ["id","prenom","nom","email","telephone","role","details","paiement"];
  private _liveAnnouncer = inject(LiveAnnouncer);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public filiere!: Filiere[];
  public sallesClasse!: SalleClasse[]; 

  public etudiant!: any;
  public message = "";
  etudiantForm!: FormGroup;
  constructor(public serviceEt: ServiceEtudiantsService, private router: Router){
 
  }
  ngOnInit(): void {
    this.etudiantForm = new FormGroup({
      nom: new FormControl('',Validators.required),
      prenom: new FormControl('',Validators.required),
      email: new FormControl('',Validators.email),
      numeroTel: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
      filiere: new FormControl('',Validators.required),
      classe: new FormControl('',Validators.required),
    });  


    this.serviceEt.getAllEtudiants().
    subscribe({
        next: (value: any[]) =>{
          this.students = value;
          this.dataSource = new MatTableDataSource(this.students);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
    })

    // recuperation des filieres
    this.serviceEt.getAllFilieres()
    .subscribe({
      next: (value: Filiere[])=>{
        this.filiere = value;
      }
    })

    // recuperaion des salles de classes
    this.serviceEt.getAllSallesclasses().subscribe({
      next: (value: SalleClasse[]) => {
        this.sallesClasse = value;
      },error(e){
        console.log("Il y a une erreur lor de la recuperation des salles de classes")
      }
    })

    

  }

 
  announceSortChange(event: Sort){
    if (event.direction) {
      this._liveAnnouncer.announce(`Sorted ${event.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  // fonction pour enregistrer l'etudiant
  saveEtudiant(){
    // testos si formulaire est valide
    if(this.etudiantForm.valid){
      const formValue = this.etudiantForm.value;
      const saveStudent = {
        ...formValue,
        matricule: "eejwkjjew",// Vous pouvez générer le matricule côté frontend
        role: 'etudiant', // Le rôle est fixe
        anneeEncours: { id: 1 }, // Remplacez par l'ID correct de l'année en cours
        gestionnaire: { id: 1 }, // Remplacez par l'ID du gestionnaire connecté ou sélectionné
      };
      console.log(saveStudent);
      this.serviceEt.saveEtudiant(saveStudent).subscribe(
        (response) =>{
          if(response != null){
            console.log(response);
            this.message = "Etudiant inseré avec succes !"
          }else{
            this.message = "Erreur lors de l'envoie !"
          }
        }
      )
    }else{
      console.log("erreur");
    }
    
  }

  listesEtudiants(){
    return this.router.navigateByUrl("/list-etudiant-non-payer");
  }

}
