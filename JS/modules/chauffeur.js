import { getCurrentUser, isAuthenticated, logout } from "./auth.js";

export function initDriverDashboard() {
  if (!isAuthenticated()) {
    window.location.href = "index.html";
    return;
  }

  const user = getCurrentUser();
  document.getElementById(
    "welcomeMessage"
  ).textContent = `Bonjour, ${user.username}`;

  const timeTrackingForm = document.getElementById("timeTrackingForm");
  timeTrackingForm.addEventListener("submit", handleTimeTracking);

  const truckSelect = document.getElementById("truckSelect");
  truckSelect.addEventListener("change", handleTruckSelection);

  const fuelTicketForm = document.getElementById("fuelTicketForm");
  fuelTicketForm.addEventListener("submit", handleFuelTicket);

  document.getElementById("logoutBtn").addEventListener("click", logout);
}

function handleTimeTracking(e) {
  e.preventDefault();
  const drivingTime = document.getElementById("drivingTime").value;
  const restTime = document.getElementById("restTime").value;

  console.log("Temps de conduite : ", drivingTime);
  console.log("Temps de repos : ", restTime);

  alert("Temps enregistrés avec succès");
}

function handleTruckSelection(e) {
  const selectedTruck = e.target.value;
  console.log("Camion sélectionné:", selectedTruck);
}

function handleFuelTicket(e) {
  e.preventDefault();
  const fuelQuantity = document.getElementById("fuelQuantity").value;
  const fuelPrice = document.getElementById("fuelPrice").value;
  console.log("Quantité de carburant:", fuelQuantity);
  console.log("Prix du carburant:", fuelPrice);

  alert("Ticket de carburant enregistré avec succès");
}
