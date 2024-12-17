// JS/modules/mission.js
import { isAuthenticated, getCurrentUser } from "./auth.js";

class Mission {
  constructor(id, title, description, start, end, driver = null, truck = null) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.start = new Date(start);
    this.end = new Date(end);
    this.driver = driver;
    this.truck = truck;
  }
}

export class MissionManager {
  constructor() {
    this.missions = [];
    this.loadMissions();
  }

  loadMissions() {
    // Simulation de chargement des missions (à remplacer par un appel API)
    this.missions = [
      new Mission(
        1,
        "Livraison Paris",
        "Livraison de marchandises à Paris",
        "2024-01-15T08:00",
        "2024-01-15T18:00",
        "driver1",
        "truck1"
      ),
      new Mission(
        2,
        "Transport Lyon",
        "Transport de matériel à Lyon",
        "2024-01-20T09:00",
        "2024-01-21T17:00",
        null,
        null
      ),
    ];
  }

  createMission(title, description, start, end) {
    const newMission = new Mission(
      this.missions.length + 1,
      title,
      description,
      start,
      end
    );
    this.missions.push(newMission);
    this.saveMissions();
    return newMission;
  }

  assignMission(missionId, driverId, truckId) {
    const mission = this.missions.find((m) => m.id === missionId);
    if (mission) {
      mission.driver = driverId;
      mission.truck = truckId;
      this.saveMissions();
    }
  }

  getMissionsForUser(username) {
    return this.missions.filter((mission) => mission.driver === username);
  }

  getAllMissions() {
    return this.missions;
  }

  saveMissions() {
    // Simulation de sauvegarde (à remplacer par un appel API)
    localStorage.setItem("missions", JSON.stringify(this.missions));
  }
}

export function initMissionManagement() {
  if (!isAuthenticated()) {
    window.location.href = "index.html";
    return;
  }

  const user = getCurrentUser();
  const missionManager = new MissionManager();

  if (user.role === "manager") {
    // Logique pour la gestion des missions côté gestionnaire
    const createMissionForm = document.getElementById("createMissionForm");
    createMissionForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const title = document.getElementById("missionTitle").value;
      const description = document.getElementById("missionDescription").value;
      const start = document.getElementById("missionStart").value;
      const end = document.getElementById("missionEnd").value;

      missionManager.createMission(title, description, start, end);
      alert("Mission créée avec succès");
      createMissionForm.reset();
    });
  }

  // Affichage des missions
  renderMissions(missionManager, user);
}

function renderMissions(missionManager, user) {
  const missionsContainer = document.getElementById("missionsContainer");
  missionsContainer.innerHTML = ""; // Réinitialisation

  const missions =
    user.role === "manager"
      ? missionManager.getAllMissions()
      : missionManager.getMissionsForUser(user.username);

  missions.forEach((mission) => {
    const missionElement = document.createElement("div");
    missionElement.classList.add("mission-card");
    missionElement.innerHTML = `
            <h3>${mission.title}</h3>
            <p>${mission.description}</p>
            <p>Début: ${new Date(mission.start).toLocaleString()}</p>
            <p>Fin: ${new Date(mission.end).toLocaleString()}</p>
            <p>Chauffeur: ${mission.driver || "Non assigné"}</p>
            <p>Camion: ${mission.truck || "Non assigné"}</p>
        `;
    missionsContainer.appendChild(missionElement);
  });
}
