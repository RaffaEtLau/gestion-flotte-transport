package java.services;

import java.models.Truck;
import java.util.ArrayList;
import java.util.List;

public class TruckService {

  private List<Truck> trucks;

  public TruckService() {
    this.trucks = new ArrayList<>();
  }
  
  public void addTruck(Truck truck) {
    trucks.add(truck);
  }

  public List<Truck> getTrucks() {
    return trucks;
  }

  public List<Truck> getActiveTrucks() {
    return trucks;
  }

}
