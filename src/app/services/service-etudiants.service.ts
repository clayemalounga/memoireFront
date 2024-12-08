import { HttpClient } from '@angular/common/http';
import { EnvironmentInjector, Injectable } from '@angular/core';
import { Envoronnement } from '../environement/envoronnement';
import { Observable } from 'rxjs';
import { EcheancierPaiement, Etudiant, Filiere, Gestionnaire, Paiement, SalleClasse } from '../models/all-models';

@Injectable({
  providedIn: 'root'
})
export class ServiceEtudiantsService {

  public message!: string;

  constructor(private httpclient: HttpClient) { }

  public getAllEtudiants():Observable<any>{
    return this.httpclient.get<any>(`${Envoronnement.ApiUrl}/etudiants`)
  }

  public getEtudiantByEmail(email: string):Observable<any>{
    return this.httpclient.get(`${Envoronnement.ApiUrl}/etudiant/${email}`);
  }

  public saveEtudiant(etudiant: Etudiant):Observable<Etudiant>{
    return this.httpclient.post<Etudiant>(`${Envoronnement.ApiUrl}/etudiant-save`,etudiant);
  } 

  // recuperation des filieres
  public getAllFilieres():Observable<Array<Filiere>>{
    return this.httpclient.get<Array<Filiere>>(`${Envoronnement.ApiUrl}/filieres`);
  }

  // recuperation des salles de classes
  public getAllSallesclasses(){
    return this.httpclient.get<Array<SalleClasse>>(`${Envoronnement.ApiUrl}/salles-classes`);
  }

  // recuperation du gestionnaire par son email
  public getGestionnaireByEmail(email: string):Observable<Gestionnaire>{
    return this.httpclient.get<Gestionnaire>(`${Envoronnement.ApiUrl}/gestionnaires/${email}`);
  }

  // recuperation des echeances de paiement de chaque etudiant
  public getEcheancePaiementEtudiant(email: string):Observable<any>{
    return this.httpclient.get<any>(`${Envoronnement.ApiUrl}/echeance-paiement-etudiant/${email}`);
  }

  // Mise a jour de l'echeance de paiement de l'etudiant
  public updateEcheacePaiementEtudiant(id :number):Observable<any>{
    return this.httpclient.put(`${Envoronnement.ApiUrl}/echeance-paiement-etudiant-update/${id}`,id);
  }

  // envoie de mail a l'etudiant 
  public sendMailEtudiant(id: number, formdata: FormData):Observable<any>{
    return this.httpclient.post(`${Envoronnement.ApiUrl}/echeance-paiement-etudiant-send-mail/${id}`,formdata);
  }
  // recuperation des paiements
  public getAllPaiement():Observable<Array<Paiement>>{
    return this.httpclient.get<Array<Paiement>>(`${Envoronnement.ApiUrl}/paiements`);
  }

  // recuperation d'un paiement
  public getPaiement(id: number):Observable<Paiement>{
    return this.httpclient.get<Paiement>(`${Envoronnement.ApiUrl}/paiement/${id}`);
  }

  // reuperation du nombre total de paiements
  public getAllPaiementNombre():Observable<number>{
    return this.httpclient.get<number>(`${Envoronnement.ApiUrl}/paiement-nombre`);
  }
  // recuperation du nombre d'etudiant
  public getAllNombreEtudiant():Observable<number>{
    return this.httpclient.get<number>(`${Envoronnement.ApiUrl}/nombre-etudiants`);
  }

  //recuperation des paiements d'un etudiants
  public getAllPaiementEtudiant(email: string):Observable<Array<Paiement>>{
    return this.httpclient.get<Array<Paiement>>(`${Envoronnement.ApiUrl}/paiements-etudiant/${email}`);
  }

  // paiement d'un etudiant par operateur  Orange ou wave
  public savePaiement(email: any):Observable<any>{
    return this.httpclient.get<any>(`${Envoronnement.ApiUrl}/paiements-etudiant-operateur/${email}`,email);
  }

  // recuperation des etudiants qui n'ont pas encore payer 
  public getAllMoisNotPaiement():Observable<Array<EcheancierPaiement>>{
    return this.httpclient.get<Array<EcheancierPaiement>>(`${Envoronnement.ApiUrl}/etudiants-non-payer`);
  }
}
