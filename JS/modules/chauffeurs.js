export function fetchDrivers() {
  const drivers = JSON.parse(localStorage.getItem("drivers")) || [];
  return drivers;
}

export function displayDrivers() {
  const driverList = document.getElementById("driverList");
  const drivers = fetchDrivers();
  driverList.innerHTML = "";
  drivers.forEach((driver) => {
    const driverDiv = document.createElement("div");
    driverDiv.innerText = `Nom: ${driver.nom}, Prénom: ${driver.prenom}, Numéro de permis: ${driver.numeroPermis}`;
    driverList.appendChild(driverDiv);
  });
}

export function displayDriverDetails(driver) {
  const driverDetails = document.getElementById("driverDetails");
  driverDetails.innerHTML = `
        <h3>Détails du Chauffeur</h3>
        <p>Nom: ${driver.nom}</p>
        <p>Prénom: ${driver.prenom}</p>
        <p>Numéro de Permis: ${driver.numeroPermis}</p>
        <p>Mission en Cours: ${driver.mission || "Aucune mission en cours"}</p>
    `;
  driverDetails.style.display = "block";
}

export function fetchDriverByName(nom) {
  const drivers = fetchDrivers();
  return drivers.find((driver) => driver.nom === nom);
}
