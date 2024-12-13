export function fetchTrucks() {
  const trucks = JSON.parse(localStorage.getItem("trucks"));
  return trucks || [];
}

export function displayTrucks() {
  const truckListDiv = document.getElementById("truckList");
  const truckList = fetchTrucks();
  truckList.innerHTML = "";
  truckList.forEach((truck) => {
    const truckItem = document.createElement("div");
    truckItem.innerHTML = `Immatriculation: ${truck.immatriculation}, Marque: ${truck.marque}, Modèle: ${truck.modele}, Année: ${truck.year}`;
    truckListDiv.appendChild(truckItem);
  });
}

export function fetchTruckByImmatriculation(immatriculation) {
  const trucks = fetchTrucks();
  return trucks.find((truck) => truck.immatriculation === immatriculation);
}

export function displayTruckDetails(truck) {
  const truckDetails = document.getElementById("truckDetails");
  truckDetails.innerHTML = `
    <h3>Détails du camion</h3>
    <p>Immatriculation : <span>${truck.immatriculation}</span></p>
    <p>Marque: <span>${truck.marque}</span></p>
    <p>Modèle: <span>${truck.modele}</span></p>
    <p>Année: <span>${truck.year}</span></p>
    <p>Statut: <span>${truck.statut}</span></p>
    <p>Date du Prochain Entretien: <span>${calculateNextMaintenance(
      truck.year
    )}</span></p>
    <p>Consommation Moyenne: <span>${
      truck.consommation !== undefined ? truck.consommation : "Non défini"
    }</span></p>
  `;
  truckDetails.style.display = "block";
}

function calculateNextMaintenance(year) {
  const nextMaintenanceYear = year + 1;
  const nextMaintenanceDate = new Date(nextMaintenanceYear, 0, 1);
  return nextMaintenanceDate.toLocaleDateString();
}
