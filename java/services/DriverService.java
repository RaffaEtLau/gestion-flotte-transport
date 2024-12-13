package java.services;

import java.models.Driver;
import java.util.ArrayList;
import java.util.List;

public class DriverService {
  
  private List<Driver> drivers;

  public DriverService() {
    this.drivers = new ArrayList<>();
  }

  public void addDriver(Driver driver) {
    drivers.add(driver);
  }

  public List<Driver> getDrivers() {
    return drivers;
  }
}
