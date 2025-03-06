package com.gestion.praticiens.gestion_praticiens.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.gestion.praticiens.gestion_praticiens.exception.PraticienNonTrouverExeption;
import com.gestion.praticiens.gestion_praticiens.model.Praticien;
import com.gestion.praticiens.gestion_praticiens.repository.PraticienRepository;

@Service
public class PraticienService {
    private PraticienRepository praticienRepository;

    public PraticienService(PraticienRepository praticienRepository) {
        this.praticienRepository = praticienRepository;
    }

    public Praticien creerPraticien(Praticien praticien) {
        return this.praticienRepository.save(praticien);
    }

    public List<Praticien> recupererPraticiens() {
        List<Praticien> praticiens = this.praticienRepository.findAll();
        if (praticiens.isEmpty()) {
            throw new PraticienNonTrouverExeption("Aucun praticien trouvé");
        }
        return praticiens;
    }

    public Praticien recupererPraticien(String id) {
        Praticien praticien = this.praticienRepository.findById(id)
                .orElseThrow(() -> new PraticienNonTrouverExeption("Praticien non trouvé"));
        return praticien;
    }

    public Praticien modifierPraticien(String id, Praticien praticien) {

        Praticien praticienModifier = this.recupererPraticien(id);
        praticienModifier.setNom(praticien.getNom());
        praticienModifier.setPrenom(praticien.getPrenom());
        praticienModifier.setEmail(praticien.getEmail());
        praticienModifier.setTelephone(praticien.getTelephone());
        praticienModifier.setAdresses(praticien.getAdresses());
        praticienModifier.setSpecialites(praticien.getSpecialites());

        return this.praticienRepository.save(praticienModifier);
    }

    public Map<String, String> supprimerPraticien(String id) {
        Praticien praticien = this.recupererPraticien(id);
        this.praticienRepository.delete(praticien);
        Map<String, String> message = Map.of("message", "Praticien supprimé avec succes");

        return message;
    }
}
