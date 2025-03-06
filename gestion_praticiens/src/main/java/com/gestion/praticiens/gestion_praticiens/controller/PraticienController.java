package com.gestion.praticiens.gestion_praticiens.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gestion.praticiens.gestion_praticiens.model.Praticien;
import com.gestion.praticiens.gestion_praticiens.service.PraticienService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/v1")
public class PraticienController {

    private PraticienService praticienService;

    public PraticienController(PraticienService praticienService) {
        this.praticienService = praticienService;
    }

    @CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*", allowCredentials = "true")
    @GetMapping("/praticiens")
    public ResponseEntity<List<Praticien>> getPraticiens() {
        return ResponseEntity.ok(praticienService.recupererPraticiens());
    }

    @CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*", allowCredentials = "true")
    @GetMapping("/praticien/{id}")
    public ResponseEntity<Praticien> getPraticienById(@PathVariable String id) {
        return ResponseEntity.ok(praticienService.recupererPraticien(id));
    }

    @CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*", allowCredentials = "true")
    @PostMapping("/creer-praticien")
    public ResponseEntity<Praticien> createPraticien(@Valid @RequestBody Praticien praticien) {
        return ResponseEntity.ok(praticienService.creerPraticien(praticien));
    }

    @CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*", allowCredentials = "true")
    @PutMapping("/modifier-praticien/{id}")
    public ResponseEntity<Praticien> updatePraticien(@PathVariable String id, @Valid @RequestBody Praticien praticien) {
        return ResponseEntity.ok(praticienService.modifierPraticien(id, praticien));
    }

    @CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*", allowCredentials = "true")
    @DeleteMapping("/supprimer-praticien/{id}")
    public ResponseEntity<Map<String, String>> deletePraticien(@PathVariable String id) {
        return ResponseEntity.ok(praticienService.supprimerPraticien(id));
    }
}
