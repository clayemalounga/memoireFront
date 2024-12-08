import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { ServiceEtudiantsService } from '../services/service-etudiants.service';
import { Etudiant } from '../models/all-models';

@Component({
  selector: 'app-gestion-etudiants',
  templateUrl: './gestion-etudiants.component.html',
  styleUrl: './gestion-etudiants.component.css'
})
export class GestionEtudiantsComponent implements OnInit, AfterViewInit{

  public dataSource :any;
  public students :any;
  public displayedColumns : string[] = ["id","prenom","nom","email","telephone","matricule","role","details","paiement"];
  
  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;
  private _liveAnnouncer = inject(LiveAnnouncer);

  constructor(public router: Router, public serviceEt: ServiceEtudiantsService){
  }

  ngOnInit(): void {
    
    this.serviceEt.getAllEtudiants().subscribe({
      next:(value: any[]) =>{
        this.students = value;
        this.dataSource = new MatTableDataSource(this.students);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
  }

  ngAfterViewInit(): void {
    
  }

  filterStudents(event: Event){
    let value = (event.target as  HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  announceSortChange(sortState: Sort) {
    
    if (sortState.direction) {
      this. _liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this. _liveAnnouncer.announce('Sorting cleared');
    }
  }

  // pour afficher la page qui permet de faire l'enregistrement d'un etudiant
  registerStudent() {
    this.router.navigateByUrl("/ajouterEtudiant");
  }

  detailsEtudiant(element: Etudiant){
    this.router.navigateByUrl("/detailEtudiant/"+element.email);
  }

  paiementEtudiant(element: Etudiant){
    this.router.navigateByUrl("/paiementEtudiant/"+element.email);
  }

}
