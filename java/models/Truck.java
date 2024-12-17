package java.models;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class Truck {

  private String immatriculation;
  private String marque;
  private String modele;
  private int year;
  private List<Driver> drivers;
  private List<Mission> missions;


  public Truck(String immatriculation, String marque, String modele, int year) {
    this.immatriculation = immatriculation;
    this.marque = marque;
    this.modele = modele;
    this.year = year;
    this.drivers = new ArrayList<>();
    this.missions = new ArrayList<>();
  }

  public void addDriver(Driver driver) {
    this.drivers.add(driver);
  }

  public void addMission(Mission mission) {
    missions.add(mission);
  }

  public List<Mission> getMissions() {
    return missions;
  }

  public String getImmatriculation() {
    return immatriculation;
  }
  public String getMarque() {
    return marque;
  }
  public String getModele() {
    return modele;
  }
  public int getYear() {
    return year;
  }
  public List<Driver> getDrivers() {
    return drivers;
  }

    @Override  
    public String toString() {
        return "Camion {" +
                "Immatriculation ='" + immatriculation + '\'' +
                ", Marque ='" + marque + '\'' +
                ", Modèle ='" + modele + '\'' +
                ", Année de construction =" + year +
                '}';
    }
}
