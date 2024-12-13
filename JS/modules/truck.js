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
