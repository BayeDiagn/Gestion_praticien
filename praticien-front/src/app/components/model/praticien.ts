export interface Adresse {
  rue: string;
  ville: string;
  type: 'OFFICE' | 'OFFICIEL' | 'HOME';
}

export interface Specialite {
  nom: string;
  description: string;
}


export interface Praticien {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresses: Adresse[];
  specialites: Specialite[];
}
