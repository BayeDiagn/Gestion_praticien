package com.gestion.praticiens.gestion_praticiens.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "praticiens")
public class Praticien {
    @Id
    private String id;

    @NotBlank(message = "Le nom est obligatoire")
    @Size(min = 2, max = 10, message = "Le nom doit contenir entre 3 et 15 caractères")
    private String nom;

    @NotBlank(message = "Le nom est obligatoire")
    @Size(min = 3, max = 15, message = "Le prenom doit contenir entre 3 et 15 caractères")
    private String prenom;

    @NotBlank(message = "L'email est obligatoire")
    @Email(message = "L'email doit être valide")
    private String email;

    @Pattern(regexp = "^(\\+221|221)?(33|70|77|78|76|75)\\d{7}$", message = "Numéro invalide.")
    private String telephone;

    private List<Adresse> adresses;
    private List<Specialite> specialites;
}
