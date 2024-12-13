package java.models;

import java.util.ArrayList;
import java.util.List;

public class Planning {

  private List<Mission> missions;
  
  public Planning() {
    this.missions = new ArrayList<>();
  }

  public void addMission(Mission mission) {
    missions.add(mission);
  }

  public List<Mission> getMissions() {
    return missions;
  }

  @Override  
    public String toString() {
        return "Planning {" +
                "Missions =" + missions +
                '}';
    }
  
}
