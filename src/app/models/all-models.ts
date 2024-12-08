export interface SalleClasse {
  id?: number; // Optionnel, généré par le backend
  nomClasse: string;
  codeClasse: string;
}

export interface Filiere {
  id?: number; // Optionnel, généré par le backend
  nomFiliere: string;
  codeFiliere: string;
}

export interface AnneeEncours {
  id?: number; // Optionnel, généré par le backend
  annee: number;
  actif: boolean;
  dateDebut: string;
  dateFin: string;
}

export interface Etudiant {
  id?: number; // Optionnel, généré par le backend
  nom: string;
  prenom: string;
  email: string;
  role: string;
  password: string;
  numeroTel: string;
  matricule: string;
  anneeEncours?: AnneeEncours; // Référence à l'année en cours
  salleClasse?: SalleClasse;   // Référence à la classe
  filiere?: Filiere;         // Référence à la filière
  gestionnaire?: Gestionnaire
}

export interface Gestionnaire {
  id?: number; // Optionnel, généré par le backend
  nom: string;
  prenom: string;
  email: string;
  role: string;
  password: string;
  numeroTel: string;
  niveauAcces: string;
  anneeEncours?: AnneeEncours; // Référence à l'année en cours
}

// echeance de paiement pour chaque etudiant 

export interface EcheancierPaiement {
  id: number;
  mois: string;
  annee: string;
  montantDu: number;
  montantPayer: number;
  status: string;
  datePaiement: string;
  etudiant: Etudiant;

}

export interface Paiement {
  id: number
  status: string
  montant: number
  datePaiement: Date
  etudiant: Etudiant
  modeDePaiement: ModeDePaiement
  gestionnaire: Gestionnaire

}

export interface ModeDePaiement {
  
  id: number;
  description: string
  libelle: string

}