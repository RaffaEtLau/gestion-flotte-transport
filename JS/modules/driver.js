export function fetchDrivers() {
  const drivers = JSON.parse(localStorage.getItem("drivers"));
  return drivers || [];
}

export function displayDrivers() {
  const driverList = fetchDrivers();
  const driverListDiv = document.getElementById("driverList");
  driverList.forEach((driver) => {
    const driverItem = document.createElement("div");
    driverItem.innerHTML = `Nom: ${driver.nom}, Prénom: ${driver.prenom}, Numéro de permis: ${driver.numeroPermis}`;
    driverListDiv.appendChild(driverItem);
  });
}
