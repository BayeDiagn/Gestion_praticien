import { Component, inject, OnInit } from '@angular/core';
import { PraticienService } from '../../service/praticien.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent implements OnInit {

  private praticienService = inject(PraticienService);

  praticiens = this.praticienService.praticiens
  message: string = "";

  ngOnInit(): void {
    this.praticienService.getPraticiens().subscribe();
    // console.log(this.praticiens())
  }

  // Méthode pour formater les spécialités
  formatSpecialites(specialites: { nom: string, description: string }[]): string {
    return specialites.map(s => s.nom).join(', ');
  }

  supprimerPraticien(id: string) {
    this.praticienService.supprimerPraticien(id).subscribe({
      next: (response) => {
        this.message = response.message
        console.log(this.message)
      },
      error: () => {
        this.message = "Une erreur est suvenue lors de la suppression."
      }
    });
  }
}
