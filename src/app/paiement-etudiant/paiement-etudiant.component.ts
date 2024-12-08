import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceEtudiantsService } from '../services/service-etudiants.service';
import { EcheancierPaiement, Etudiant, Gestionnaire } from '../models/all-models';
import jsPDF from 'jspdf';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-paiement-etudiant',
  templateUrl: './paiement-etudiant.component.html',
  styleUrl: './paiement-etudiant.component.css'
})
export class PaiementEtudiantComponent implements OnInit {

  public message!: string;
  public email!: string;
  public etudiant!: Etudiant;
  public userValideGest!: Gestionnaire;
  public userValideEtu!: Etudiant;
  public echeancePaiementEt: any;
  isFormVisible: boolean = false; // Formulaire caché par défaut

  public profile!: KeycloakProfile;

  formgroup!: FormGroup;

  constructor(private activitedRoute: ActivatedRoute, public serviceEt: ServiceEtudiantsService,
    private keycloak: KeycloakService
  ){
  }

  ngOnInit(): void {
    this.formgroup = new FormGroup({
      numero: new FormControl("",Validators.required),
      montant: new FormControl("",Validators.required),
      typePaiement: new FormControl("",Validators.required),
    })

    // recuperation de l'email qui est dans l'url
    this.email = this.activitedRoute.snapshot.params["email"];
    
    // recuperons l'etudiant puis son echeance de paiement
    this.serviceEt.getEtudiantByEmail(this.email).subscribe({
      next: (value: Etudiant)=>{
        this.etudiant = value;
      }
    })

    // recuperation des echeances de paiement d'un etudiant 
    this.serviceEt.getEcheancePaiementEtudiant(this.email).subscribe({
      next: (value: EcheancierPaiement[])=>{
        this.echeancePaiementEt = value;
      }
    })

    //recuperation du profil de l'etudiant
    if(this.keycloak.isLoggedIn()){
      this.keycloak.loadUserProfile().then(profile =>{
        this.email = profile.email ||"";
        
        // recuperation du compte de l'utilisateur depuis la base de donnees
        if(this.email === "clayemalounga31@gmail.com"){
          this.serviceEt.getGestionnaireByEmail(this.email).subscribe({
            next: (value: Gestionnaire) =>{
              this.userValideGest = value;
            }
          })
        }else{
          this.serviceEt.getEtudiantByEmail(this.email).subscribe({
            next: (value: Etudiant)=>{
              this.userValideEtu = value;
            }
          })
        }
        
      })
    }

  }

  // la fonction pour le paiment en espece effectuer par le gestionnaire
  payerEnEspece(item: EcheancierPaiement): void{
    if(item.status !== 'payé'){
      alert("Vous souhaitez effectuer un paiement en espece du moi de "+item.mois+" ?")
       // Generation de la facture e pdf
      const pdfFacture = this.generationPdf(item);
      this.serviceEt.updateEcheacePaiementEtudiant(item.id).subscribe({
        next: (value: any)=>{
          this.message = "Le paiement du mois de "+ item.mois+" est valide avec success !";

          const formData = new FormData();
          formData.append('file', pdfFacture);
          this.serviceEt.sendMailEtudiant(item.id,formData)
          .subscribe({
            next: () =>{
              alert("Votre facture du mois de "+item.mois+"  est envoyee avec success !")
            },error(e :any){
              console.log(e+ "Erreur d'envoie de mail !");
            }
          })

        }
      })
    }else{
      alert(`Le mois de ${item.mois} est déjà payé.`);
    }

  }

  // le paiement effectuer par l'etudiant
  paiementEtudiantPaOperateur():void{
    console.log(this.formgroup)
    alert(`${this.email} votre transaction est en cours`);

    this.message = "Transaction valide !";
  }

  // une fonction pour afficher le formulaire pour le paiement par operateur 
  toggleForm(item: EcheancierPaiement): void {
    if(item.status !== "payé" ){
      let valide = confirm("Veuillez remplire le formulaire pour effectuer un paiement. ");
      if(valide){
        this.isFormVisible = !this.isFormVisible; // Bascule l'état
      }
    }else{
      alert("Attention !!! Le mois de "+ item.mois+ " est déjà payé ");
    }
  }

  // generation du fichier pdf pour la generation de la facture ( le document et les textes )
   generationPdf(item: EcheancierPaiement): Blob {
     const pdf = new jsPDF();

     pdf.setFont("Times New Roman","bold");
     pdf.setFontSize(16);
     pdf.text("Facture de Paiement de mensualite", 105,20,{align: "center"});

     pdf.setFont("Times New Roman");
     pdf.setFontSize(14);
     pdf.text(" ( ClayesTrans ) ",105,30, {align: "center"});
    // ligne de separation
     pdf.line(20,35,190,35);

     // Contenu de la facture
    pdf.setFont("Times New Roman", "normal");
    pdf.setFontSize(12);

    pdf.text(`Nom complet de l'étudiant : ${item.etudiant.nom} ${item.etudiant.prenom}`, 20, 45);
    pdf.text(`Classe : ${item.etudiant.salleClasse?.nomClasse}`,20,55);
    pdf.text(`Filiere : ${item.etudiant.filiere?.nomFiliere}`,20,65);
    pdf.text(`Mois de paiement : ${item.mois}`, 20, 75);
    pdf.text(`Montant : ${item.montantDu} FCFA`, 20, 85);
    pdf.text(`Date de paiement : ${new Date().toLocaleDateString()}`, 20, 95);

    // Encadré pour la signature
    pdf.rect(20, 90, 170, 30); // Rectangle pour la signature
    pdf.text("Signature :", 25, 105);

    // Pied de page
    pdf.setFontSize(10);
    pdf.text("Merci pour votre paiement !", 105, 290, { align: "center"});
     return pdf.output("blob");
  }
}
