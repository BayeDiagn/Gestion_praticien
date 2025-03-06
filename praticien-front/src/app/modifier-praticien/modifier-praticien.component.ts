import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ActivatedRoute, Router } from '@angular/router';
import { Specialite, Adresse, Praticien } from '../components/model/praticien';
import { PraticienService } from '../service/praticien.service';




@Component({
  selector: 'app-modifier-praticien',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
  ],
  templateUrl: './modifier-praticien.component.html',
  styleUrls: ['./modifier-praticien.component.scss'],
})
export class ModifierPraticienComponent implements OnInit {

  praticienForm: FormGroup;
  specialites: Specialite[] = [
    { nom: 'Cardiologie', description: 'Spécialité médicale du cœur' },
    { nom: 'Dermatologie', description: 'Spécialité médicale de la peau' },
    { nom: 'Neurologie', description: 'Spécialité médicale du système nerveux' },
  ];
  filteredSpecialites: Specialite[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  praticienId!: string; // ID du praticien à modifier

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private praticienService: PraticienService
  ) {
    this.praticienForm = this.fb.group({
      id: [''],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      adresses: this.fb.array([]),
      specialites: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    // Récupérer l'ID du praticien depuis l'URL
    this.praticienId = this.route.snapshot.paramMap.get('id')!;

    // Charger les données du praticien
    this.loadPraticien(this.praticienId);
  }

  // Charger les données du praticien
  loadPraticien(id: string): void {
    this.praticienService.getPraticienById(id).subscribe((praticien: { id: any; nom: any; prenom: any; email: any; telephone: any; adresses: any[]; specialites: any[]; }) => {
      this.praticienForm.patchValue({
        id: praticien.id,
        nom: praticien.nom,
        prenom: praticien.prenom,
        email: praticien.email,
        telephone: praticien.telephone,
      });

      // Ajouter les adresses
      praticien.adresses.forEach((adresse) => this.addAdresse(adresse));

      // Ajouter les spécialités
      praticien.specialites.forEach((specialite) =>
        this.specialitesFormArray.push(this.fb.group(specialite))
      );

      this.filteredSpecialites = this.specialites;
    });
  }

  // Getters pour les FormArray
  get adresses() {
    return this.praticienForm.get('adresses') as FormArray;
  }

  get specialitesFormArray() {
    return this.praticienForm.get('specialites') as FormArray;
  }

  // Ajouter une adresse
  addAdresse(adresse?: Partial<Adresse>): void {
    this.adresses.push(
      this.fb.group({
        rue: [adresse?.rue || '', Validators.required],
        ville: [adresse?.ville || '', Validators.required],
        type: [adresse?.type || 'OFFICE', Validators.required],
      })
    );
  }

  // Ajouter une spécialité
  addSpecialite(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      const specialite = this.specialites.find((s) => s.nom === value.trim());
      if (specialite) {
        this.specialitesFormArray.push(this.fb.group(specialite));
      }
    }

    if (input) {
      input.value = '';
    }
  }

  // Supprimer une spécialité
  removeSpecialite(index: number): void {
    this.specialitesFormArray.removeAt(index);
  }

  // Filtrer les spécialités
  filterSpecialites(value: string): void {
    this.filteredSpecialites = this.specialites.filter((specialite) =>
      specialite.nom.toLowerCase().includes(value.toLowerCase())
    );
  }

  // Soumettre le formulaire
  onSubmit(): void {
    if (this.praticienForm.valid) {
      const praticien: Praticien = this.praticienForm.value;
      this.praticienService.updatePraticien(this.praticienId, praticien).subscribe(() => {
        this.router.navigate(['/praticiens']); // Rediriger après la mise à jour
      });
    }
  }
}
