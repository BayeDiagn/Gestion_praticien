import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Specialite, Praticien } from '../model/praticien';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PraticienService } from '../../service/praticien.service';

@Component({
  selector: 'app-ajouter-praticien',
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
  templateUrl: './ajouter-praticien.component.html',
  styleUrls: ['./ajouter-praticien.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AjouterPraticienComponent {

  private praticienService = inject(PraticienService);
  message:string = "";
  praticienForm: FormGroup;
  specialites: Specialite[] = [
    { nom: 'Cardiologie', description: 'Spécialité médicale du cœur' },
    { nom: 'Dermatologie', description: 'Spécialité médicale de la peau' },
    { nom: 'Neurologie', description: 'Spécialité médicale du système nerveux' },
  ];
  filteredSpecialites!: Specialite[];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private fb: FormBuilder) {
    this.praticienForm = this.fb.group({
      id: [''], // Généré côté serveur ou via un service
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', Validators.required],
      adresses: this.fb.array([]),
      specialites: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.filteredSpecialites = this.specialites;
  }

  get adresses() {
    return this.praticienForm.get('adresses') as FormArray;
  }

  get specialitesFormArray() {
    return this.praticienForm.get('specialites') as FormArray;
  }

  addAdresse(type: 'OFFICE' | 'OFFICIEL' | 'HOME') {
    this.adresses.push(
      this.fb.group({
        rue: ['', Validators.required],
        ville: ['', Validators.required],
        type: [type, Validators.required],
      })
    );
  }

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

  removeSpecialite(index: number): void {
    this.specialitesFormArray.removeAt(index);
  }

  filterSpecialites(value: string): void {
    this.filteredSpecialites = this.specialites.filter((specialite) =>
      specialite.nom.toLowerCase().includes(value.toLowerCase())
    );
  }

  onSubmit(): void {
    if (this.praticienForm.valid) {
      const praticien: Praticien = this.praticienForm.value;
      this.praticienService.ajouterPraticien(praticien).subscribe({
        next: () => {
          this.message = "Praticien ajouté avec succès"
          this.praticienForm.reset();
        },
        error: () => {
          this.message = "Une erreur est survenue lors de l'ajout du praticien."
        }
      })
    }
  }
}
