import { getCurrentUser, isAuthenticated, logout } from "./auth.js";

export function initDriverDashboard() {
  //vérification authentification
  if (!isAuthenticated) {
    window.location.href = "index.html";
    return;
  }

  const user = getCurrentUser();
  document.getElementById(
    "welcomeMessage"
  ).textContent = `Bonjour, ${user.username}`;

  //formulaire tps conduite
  const timeTrakingForm = document.getElementById("timeTrackingForm");
  timeTrakingForm.addEventListener("submit", handleTimeTracking);

  //sélection camion
  const truckSelect = document.getElementById("truckSelect");
  truckSelect.addEventListener("change", handleTruckSelect);

  //ticket carburant
  const fuelTicketForm = document.getElementById("fuelTicketForm");
  fuelTicketForm.addEventListener("submit", handleFuelTicket);

  //déconnexion
  document.getElementById("logoutBtn").addEventListener("click", logout);
}

function handleTimeTracking(e) {
  e.preventDefault();
  const drivingTime = document.getElementById("drivingTime").value;
  const restTime = document.getElementById("restTime").value;

  console.log("Temps de conduite :", drivingTime);
  console.log("Temps de repos :", restTime);

  alert("Temps enregistrés avec succès");
}

function handleTruckSelect(e) {
  const selectedTruck = e.target.value;
  localStorage.setItem(truckSelect, selectedTruck);
  console.log("Camion sélectionné :", selectedTruck);
}

function handleFuelTicket(e) {
  e.preventDefault();
  const fuelQuantity = document.getElementById("fuelQuantity").value;
  const fuelPrice = document.getElementById("fuelPrice").value;

  localStorage.setItem(fuelQuantité, fuelQuantity);
  localStorage.setItem(fuelPrix, fuelPrice);
  console.log("Quantité de carburant ajoutée :", fuelQuantity);
  console.log("Prix du carburant : ", fuelPrice);

  alert("Ticket de carburant enregistré avec succès");
}
