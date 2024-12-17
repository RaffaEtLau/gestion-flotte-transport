package java.models;

import java.time.LocalDateTime;
import java.time.Duration;

public class Mission {
    public enum Status {
        NON_ATTRIBUEE, 
        EN_PREPARATION, 
        EN_COURS, 
        TERMINEE, 
        ANNULEE
    }

    private Driver driver;
    private Truck truck;
    private String startLocation;
    private String endLocation;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private int plannedDriveTime; // en minutes
    private int plannedRestTime; // en minutes
    private Status status;

    public Mission(Driver driver, Truck truck, String startLocation, String endLocation, 
                   LocalDateTime startTime, int plannedDriveTime, int plannedRestTime) {
        this.driver = driver;
        this.truck = truck;
        this.startLocation = startLocation;
        this.endLocation = endLocation;
        this.startTime = startTime;
        this.plannedDriveTime = plannedDriveTime;
        this.plannedRestTime = plannedRestTime;
        this.status = Status.NON_ATTRIBUEE;
    }

    // Getters et setters existants, ajouter :
    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public LocalDateTime getEndTime() {
        return startTime.plusMinutes(plannedDriveTime);
    }
}