// JS/modules/planning.js
import { isAuthenticated, getCurrentUser } from "./auth.js";
import { MissionManager } from "./mission.js";

export function initPlanning() {
  if (!isAuthenticated()) {
    window.location.href = "index.html";
    return;
  }

  const user = getCurrentUser();
  const missionManager = new MissionManager();
  const calendar = document.getElementById("calendar");
  const viewToggle = document.getElementById("viewToggle");

  function renderCalendar(view = "month") {
    calendar.innerHTML = ""; // Réinitialisation
    const missions =
      user.role === "manager"
        ? missionManager.getAllMissions()
        : missionManager.getMissionsForUser(user.username);

    const currentDate = new Date();
    const startDate =
      view === "week"
        ? getStartOfWeek(currentDate)
        : getStartOfMonth(currentDate);
    const endDate =
      view === "week" ? getEndOfWeek(currentDate) : getEndOfMonth(currentDate);

    // Création de la grille de calendrier
    const grid = document.createElement("div");
    grid.classList.add("calendar-grid", `view-${view}`);

    // Génération des en-têtes de jours/semaines
    const headers =
      view === "week"
        ? generateWeekHeaders(startDate)
        : generateMonthHeaders(startDate);

    headers.forEach((header) => grid.appendChild(header));

    // Placement des missions
    missions.forEach((mission) => {
      const missionStart = new Date(mission.start);
      if (missionStart >= startDate && missionStart <= endDate) {
        const missionElement = createMissionElement(mission, view);
        grid.appendChild(missionElement);
      }
    });

    calendar.appendChild(grid);
  }

  function createMissionElement(mission, view) {
    const element = document.createElement("div");
    element.classList.add("mission-event");
    element.textContent = `${mission.title} - ${
      mission.driver || "Non assigné"
    }`;

    // Positionnement basé sur la date de début de la mission
    const missionStart = new Date(mission.start);
    element.style.gridColumnStart =
      view === "week"
        ? (missionStart.getDay() + 1).toString()
        : missionStart.getDate().toString();

    return element;
  }

  function generateWeekHeaders(startDate) {
    const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
    return days.map((day, index) => {
      const header = document.createElement("div");
      header.classList.add("calendar-header");
      header.textContent = `${day} ${new Date(
        startDate.getTime() + index * 24 * 60 * 60 * 1000
      ).getDate()}`;
      return header;
    });
  }

  function generateMonthHeaders(startDate) {
    const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
    return days.map((day) => {
      const header = document.createElement("div");
      header.classList.add("calendar-header");
      header.textContent = day;
      return header;
    });
  }

  // Utilitaires pour obtenir les dates
  function getStartOfWeek(date) {
    const start = new Date(date);
    start.setDate(date.getDate() - date.getDay());
    return start;
  }

  function getEndOfWeek(date) {
    const end = new Date(date);
    end.setDate(date.getDate() + (6 - date.getDay()));
    return end;
  }

  function getStartOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  function getEndOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }

  // Gestion du changement de vue
  viewToggle.addEventListener("change", (e) => {
    renderCalendar(e.target.value);
  });

  // Rendu initial
  renderCalendar();
}
