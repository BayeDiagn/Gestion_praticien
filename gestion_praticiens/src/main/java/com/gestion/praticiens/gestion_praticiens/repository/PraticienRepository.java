package com.gestion.praticiens.gestion_praticiens.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.gestion.praticiens.gestion_praticiens.model.Praticien;

@Repository
public interface PraticienRepository extends MongoRepository<Praticien, String> {

}