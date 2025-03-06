package com.gestion.praticiens.gestion_praticiens.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Adresse {
    private String rue;
    private String ville;
    private TypeAdresse type;

    public enum TypeAdresse {
        OFFICE, OFFICIEL, HOME
    }
}
