package java.services;

import java.models.Driver;
import java.models.Mission;
import java.models.Truck;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class PlanningService {
    private List<Mission> missions;

    public PlanningService() {
        this.missions = new ArrayList<>();
    }

    public void addMission(Mission mission) {
        missions.add(mission);
    }

    // Missions non attribuées
    public List<Mission> getUnassignedMissions() {
        return missions.stream()
            .filter(m -> m.getStatus() == Mission.Status.NON_ATTRIBUEE)
            .collect(Collectors.toList());
    }

    // Missions en cours
    public List<Mission> getOngoingMissions() {
        return missions.stream()
            .filter(m -> m.getStatus() == Mission.Status.EN_COURS)
            .collect(Collectors.toList());
    }

    // Missions terminées
    public List<Mission> getCompletedMissions() {
        return missions.stream()
            .filter(m -> m.getStatus() == Mission.Status.TERMINEE)
            .collect(Collectors.toList());
    }

    // Trouver des chauffeurs disponibles
    public List<Driver> getAvailableDrivers(List<Driver> allDrivers) {
        return allDrivers.stream()
            .filter(driver -> 
                driver.getMissionHistory().stream()
                    .noneMatch(m -> m.getStatus() == Mission.Status.EN_COURS)
            )
            .collect(Collectors.toList());
    }

    // Trouver des camions disponibles
    public List<Truck> getAvailableTrucks(List<Truck> allTrucks) {
        return allTrucks.stream()
            .filter(truck -> 
                truck.getMissions().stream()
                    .noneMatch(m -> m.getStatus() == Mission.Status.EN_COURS)
            )
            .collect(Collectors.toList());
    }

    // Attribuer une mission à un chauffeur et un camion
    public void assignMission(Mission mission, Driver driver, Truck truck) {
        if (driver.canAcceptMission(mission)) {
            mission.setDriver(driver);
            mission.setTruck(truck);
            mission.setStatus(Mission.Status.EN_COURS);
            driver.assignMission(mission);
            truck.addMission(mission);
        } else {
            throw new IllegalStateException("Mission cannot be assigned");
        }
    }
}