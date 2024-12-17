package java;

import java.services.DriverService;
import java.services.PlanningService;
import java.services.TruckService;
import java.time.LocalDateTime;
import java.models.Driver;
import java.models.Mission;
import java.models.Truck;

public class Main {

  public static void main(String[] args) {
    
      // Création de chauffeurs
        Driver driver1 = new Driver("Doe", "John", "D12345");
        Driver driver2 = new Driver("Smith", "Jane", "D67890");
        driverService.addDriver(driver1);
        driverService.addDriver(driver2);

        // Création de camions
        Truck truck1 = new Truck("ABC123", "Volvo", "FH", 2020);
        Truck truck2 = new Truck("XYZ456", "Scania", "R", 2019);
        truckService.addTruck(truck1);
        truckService.addTruck(truck2);

        // Création de missions
        Mission mission1 = new Mission(
            driver1, 
            truck1, 
            "Paris", 
            "Lyon", 
            LocalDateTime.now(), 
            240, // 4h de conduite
            45   // 45 min de pause
        );
        try {
            planningService.assignMission(mission1, driver1, truck1);
            System.out.println("Mission attribuée avec succès");
        } catch (IllegalStateException e) {
            System.out.println("Impossible d'attribuer la mission : " + e.getMessage());
        }

    // Affichage des informations
    System.out.println("Camions actifs : " + truckService.getActiveTrucks());
    System.out.println("Chauffeurs : " + driverService.getDrivers());
            System.out.println("Missions non attribuées : " + 
            planningService.getUnassignedMissions().size());
        System.out.println("Missions en cours : " + 
            planningService.getOngoingMissions().size());


  }
  
}
