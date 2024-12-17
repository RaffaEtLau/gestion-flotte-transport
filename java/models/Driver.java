package java.models;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class Driver {

    private String nom;
    private String prenom;
    private String numeroPermis;
    private List<Mission> missionHistory;
    private LocalDateTime lastRestPeriodStart;
    private int dailyDriveTime; // en minutes
    private int weeklyDriveTime; // en minutes

    public Driver(String nom, String prenom, String numeroPermis) {
        this.nom = nom;
        this.prenom = prenom;
        this.numeroPermis = numeroPermis;
        this.missionHistory = new ArrayList<>();
        this.dailyDriveTime = 0;
        this.weeklyDriveTime = 0;
    }

    // Méthodes pour vérifier la conformité aux règles de conduite
    public boolean canAcceptMission(Mission mission) {
        // Règles européennes (simplifié) :
        // - Conduite max 9h par jour
        // - Pause de 45 min toutes les 4h30
        // - Repos journalier de 11h minimum
        if (dailyDriveTime + mission.getPlannedDriveTime() > 540) { // 9h = 540 min
            return false;
        }

        // Vérification du temps de repos
        if (lastRestPeriodStart != null) {
            Duration timeSinceLastRest = Duration.between(lastRestPeriodStart, LocalDateTime.now());
            if (timeSinceLastRest.toHours() < 11) {
                return false;
            }
        }

        return true;
    }

    public void assignMission(Mission mission) {
        if (canAcceptMission(mission)) {
            missionHistory.add(mission);
            dailyDriveTime += mission.getPlannedDriveTime();
            mission.setStatus(Mission.Status.EN_COURS);
        } else {
            throw new IllegalStateException("Mission cannot be assigned due to driving time regulations");
        }
    }

    public void endMission(Mission mission) {
        mission.setStatus(Mission.Status.TERMINEE);
        // Réinitialiser les compteurs si nécessaire
        if (isDailyLimitReached()) {
            resetDailyDriveTime();
        }
    }

    private boolean isDailyLimitReached() {
        return dailyDriveTime >= 540; // 9h
    }

    private void resetDailyDriveTime() {
        dailyDriveTime = 0;
        lastRestPeriodStart = LocalDateTime.now();
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
