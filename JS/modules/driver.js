export function fetchDrivers() {
  const drivers = JSON.parse(localStorage.getItem("drivers"));
  return drivers || [];
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
