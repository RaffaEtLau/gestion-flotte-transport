package java.models;

public class Mission {

  private Driver driver;
  private Truck truck;
  private String startLocation;
  private String endLocation;
  private int tempsConduite;
  private int tempsRepos;
  
  public Mission(Driver driver, Truck truck, String startLocation, String endLocation, int tempsConduite, int tempsRepos) {
        this.driver = driver;
        this.truck = truck;
        this.startLocation = startLocation;
        this.endLocation = endLocation;
        this.tempsConduite = tempsConduite;
        this.tempsRepos = tempsRepos;
    }

    // Getters et Setters  
    public Driver getDriver() {
        return driver;
    }

    public Truck getTruck() {
        return truck;
    }

    public String getStartLocation() {
        return startLocation;
    }

    public String getEndLocation() {
        return endLocation;
    }

    public int getTempsConduite() {
        return tempsConduite;
    }
    public int getTempsRepos() {
        return tempsRepos;
    }

    @Override  
    public String toString() {
        return "Mission{" +
                "Conducteur =" + driver +
                ", Camion =" + truck +
                ", Lieu de départ ='" + startLocation + '\'' +
                ", Lieu d'arrivée ='" + endLocation + '\'' +
                ", Temps de conduite =" + tempsConduite + '\'' +
                ", Temps de repos =" + tempsRepos +
                '}';
    }
}
