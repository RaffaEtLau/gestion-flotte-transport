package java;

import java.services.DriverService;
import java.services.TruckService;
import java.time.LocalDate;
import java.models.Driver;
import java.models.Truck;

public class Main {

  public static void main(String[] args) {
    
    TruckService truckService = new TruckService();
    DriverService driverService = new DriverService();

    // Exemple d'utilisation  
    Truck truck1 = new Truck("ABC123", "Volvo", "FH", 2020);
    truckService.addTruck(truck1);

    Driver driver1 = new Driver("Doe", "John", "D12345");
    driverService.addDriver(driver1);


    // Affichage des informations
    System.out.println("Camions actifs : " + truckService.getActiveTrucks());
    System.out.println("Chauffeurs : " + driverService.getDrivers());


  }
  
}
