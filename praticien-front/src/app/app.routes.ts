import { Routes } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { AjouterPraticienComponent } from './components/ajouter-praticien/ajouter-praticien.component';
import { ModifierPraticienComponent } from './modifier-praticien/modifier-praticien.component';

export const routes: Routes = [
  { path: 'praticiens', component: AccueilComponent },
  { path: '', redirectTo: 'praticiens', pathMatch: 'full' },
  { path: 'ajouter-praticien', component: AjouterPraticienComponent},
  { path: 'praticiens/modifier-praticien/:id', component: ModifierPraticienComponent}
];
