import { displayTrucks } from "./modules/truck.js";
import { displayDrivers } from "./modules/driver.js";

document.addEventListener("DOMContentLoaded", () => {
  // Fonction pour initialiser le localStorage avec des données de test
  function initializeLocalStorage() {
    const trucks = [
      { immatriculation: "ABC123", marque: "Volvo", modele: "FH", year: 2020 },
      { immatriculation: "XYZ456", marque: "Scania", modele: "R", year: 2019 },
    ];

    const drivers = [
      { nom: "Doe", prenom: "John", numeroPermis: "D12345" },
      { nom: "Smith", prenom: "Jane", numeroPermis: "D67890" },
    ];

    localStorage.setItem("trucks", JSON.stringify(trucks));
    localStorage.setItem("drivers", JSON.stringify(drivers));
  }

  // Fonction pour ajouter un camion au localStorage
  function addTruckToLocalStorage(truck) {
    const trucks = fetchTrucks();
    trucks.push(truck);
    localStorage.setItem("trucks", JSON.stringify(trucks));
  }

  // Fonction pour ajouter un chauffeur au localStorage
  function addDriverToLocalStorage(driver) {
    const drivers = fetchDrivers();
    drivers.push(driver);
    localStorage.setItem("drivers", JSON.stringify(drivers));
  }

  // Vérifie si le localStorage est vide et initialise les données
  if (!localStorage.getItem("trucks") || !localStorage.getItem("drivers")) {
    initializeLocalStorage();
  }

  // Affiche les camions sur la page truck.html
  if (document.getElementById("truckList")) {
    displayTrucks();
    // Gestion de l'ajout d'un camion
    const addTruckForm = document.getElementById("addTruckForm");
    addTruckForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const immatriculation = document.getElementById("immatriculation").value;
      const marque = document.getElementById("marque").value;
      const modele = document.getElementById("modele").value;
      const year = parseInt(document.getElementById("year").value);

      const newTruck = { immatriculation, marque, modele, year };
      addTruckToLocalStorage(newTruck);
      displayTrucks(); // Met à jour l'affichage
      addTruckForm.reset(); // Réinitialise le formulaire
    });
  } else {
    console.error("Formulaire d'ajout de camion introuvable !");
  }

  // Affiche les chauffeurs sur la page driver.html
  if (document.getElementById("driverList")) {
    displayDrivers();
    // Gestion de l'ajout d'un chauffeur
    const addDriverForm = document.getElementById("addDriverForm");
    addDriverForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nom = document.getElementById("nom").value;
      const prenom = document.getElementById("prenom").value;
      const numeroPermis = document.getElementById("numeroPermis").value;

      const newDriver = { nom, prenom, numeroPermis };
      addDriverToLocalStorage(newDriver);
      displayDrivers(); // Met à jour l'affichage
      addDriverForm.reset(); // Réinitialise le formulaire
    });
  } else {
    console.error("Formulaire d'ajout de chauffeur introuvable !")
  }
});
