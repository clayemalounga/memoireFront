import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ServiceEtudiantsService } from '../services/service-etudiants.service';
import { Etudiant } from '../models/all-models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-paiements',
  templateUrl: './gestion-paiements.component.html',
  styleUrl: './gestion-paiements.component.css'
})
export class GestionPaiementsComponent implements OnInit, AfterViewInit {


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private _liveAnnouncer = inject(LiveAnnouncer);
  public students: any;
  public dataSource: any;
  public displayedColumns: string[] = ["id", "prenom", "nom", "email", "telephone","matricule","role","details", "paiement"];

  constructor(public serviceEt: ServiceEtudiantsService, public router: Router){

  }

  ngOnInit(): void {

    this.serviceEt.getAllEtudiants().subscribe({
      next : (value: any[])=>{
        this.students = value;
        this.dataSource = new MatTableDataSource(this.students);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })

  }

  announceSortChange(event: Sort) {
    if (event.direction) {
      this._liveAnnouncer.announce(`Sorted ${event.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngAfterViewInit(): void {
    
  }

  filterStudents(event: Event) {

    let value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }


  // recuperer un etudiant
  detailEtudiant(element: Etudiant){
    this.router.navigateByUrl("/detailEtudiant/"+element.email);
  }

  // paiement d'un etudiant
  paiementEtudiant(element: Etudiant){
    return this.router.navigateByUrl("/paiementEtudiant/"+element.email);
  }

}
