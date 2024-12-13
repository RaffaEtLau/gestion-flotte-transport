package java.models;

import java.sql.Date;

public class Driver {

  private String nom;
  private String prenom;
  private String numeroPermis; 

  public Driver(String nom, String prenom, String numeroPermis) {
    this.nom = nom;
    this.prenom = prenom;
    this.numeroPermis = numeroPermis;
  }

  public String getNom() {
    return nom;
  }
  public String getPrenom() {
    return prenom;
  }
  public String getNumeroPermis() {
    return numeroPermis;
  }
  
  @Override  
    public String toString() {
        return "Driver{" +
                "Nom ='" + nom + '\'' +
                "Prénom ='" + prenom + '\'' +
                ", Numéro de permis ='" + numeroPermis + '\'' +
                '}';
    }
}
