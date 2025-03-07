package com.gestion.praticiens.gestion_praticiens.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gestion.praticiens.gestion_praticiens.model.Praticien;
import com.gestion.praticiens.gestion_praticiens.service.PraticienService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/v1")
public class PraticienController {

    private PraticienService praticienService;

    public PraticienController(PraticienService praticienService) {
        this.praticienService = praticienService;
    }

    // Rechercher tous les praticiens
    @Operation(summary = "Rechercher tous les praticiens", description = "Rechercher tous les praticiens")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Praticiens trouvés", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Praticien.class))),
            @ApiResponse(responseCode = "500", description = "Erreur interne du serveur", content = @Content)
    })
    @GetMapping("/praticiens")
    public ResponseEntity<List<Praticien>> getPraticiens() {
        return ResponseEntity.ok(praticienService.recupererPraticiens());
    }

    // Rechercher un praticien
    @Operation(summary = "Rechercher un praticien", description = "Rechercher un praticien")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Praticien trouvé", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Praticien.class))),
            @ApiResponse(responseCode = "404", description = "Praticien non trouvé", content = @Content),
            @ApiResponse(responseCode = "500", description = "Erreur interne du serveur", content = @Content)
    })
    @GetMapping("/praticien/{id}")
    public ResponseEntity<Praticien> getPraticienById(@PathVariable String id) {
        return ResponseEntity.ok(praticienService.recupererPraticien(id));
    }

    // Créer un nouveau praticien
    @Operation(summary = "Créer un nouveau praticien", description = "Ajoute un nouveau praticien au système")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Praticien créé avec succès", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Praticien.class))),
            @ApiResponse(responseCode = "400", description = "Données d'entrée invalides", content = @Content),
            @ApiResponse(responseCode = "500", description = "Erreur interne du serveur", content = @Content)
    })
    @PostMapping("/creer-praticien")
    public ResponseEntity<Praticien> createPraticien(@Valid @RequestBody Praticien praticien) {
        return ResponseEntity.ok(praticienService.creerPraticien(praticien));
    }

    // Modifier un praticien
    @Operation(summary = "Modifier un praticien", description = "Modifier un praticien")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Praticien modifié", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Praticien.class))),
            @ApiResponse(responseCode = "400", description = "Données d'entrée invalides", content = @Content),
            @ApiResponse(responseCode = "404", description = "Praticien non trouvé", content = @Content),
    })
    @PutMapping("/modifier-praticien/{id}")
    public ResponseEntity<Praticien> updatePraticien(@PathVariable String id, @Valid @RequestBody Praticien praticien) {
        return ResponseEntity.ok(praticienService.modifierPraticien(id, praticien));
    }

    // Supprimer un praticien
    @Operation(summary = "Supprimer un praticien", description = "Supprimer un praticien")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Praticien supprimé", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Praticien.class))),
            @ApiResponse(responseCode = "404", description = "Praticien non trouvé", content = @Content),
    })
    @DeleteMapping("/supprimer-praticien/{id}")
    public ResponseEntity<Map<String, String>> deletePraticien(@PathVariable String id) {
        return ResponseEntity.ok(praticienService.supprimerPraticien(id));
    }
}
