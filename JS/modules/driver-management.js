// JS/modules/driver-management.js
import { getCurrentUser, isAuthenticated } from "./auth.js";

export class DriverManager {
  constructor() {
    this.drivers = this.loadDrivers();
  }

  loadDrivers() {
    const storedDrivers = localStorage.getItem("drivers");
    return storedDrivers ? JSON.parse(storedDrivers) : [];
  }

  saveDrivers() {
    localStorage.setItem("drivers", JSON.stringify(this.drivers));
  }

  addDriver(firstName, lastName, username, password, email, phoneNumber) {
    // Vérifier si le username existe déjà
    if (this.drivers.some((driver) => driver.username === username)) {
      throw new Error("Ce nom d'utilisateur existe déjà");
    }

    const newDriver = {
      id: this.generateId(),
      firstName,
      lastName,
      username,
      password, // À remplacer par un hashage de mot de passe en production
      email,
      phoneNumber,
      createdAt: new Date().toISOString(),
    };

    this.drivers.push(newDriver);
    this.saveDrivers();

    // Mettre à jour les utilisateurs pour l'authentification
    this.updateAuthUsers(newDriver);

    return newDriver;
  }

  updateAuthUsers(driver) {
    const users = JSON.parse(localStorage.getItem("authUsers") || "[]");
    users.push({
      username: driver.username,
      password: driver.password,
      role: "driver",
    });
    localStorage.setItem("authUsers", JSON.stringify(users));
  }

  generateId() {
    return this.drivers.length > 0
      ? Math.max(...this.drivers.map((d) => d.id)) + 1
      : 1;
  }

  getDrivers() {
    return this.drivers;
  }

  findDriverByUsername(username) {
    return this.drivers.find((driver) => driver.username === username);
  }

  updateDriver(id, updatedInfo) {
    const driverIndex = this.drivers.findIndex((driver) => driver.id === id);
    if (driverIndex !== -1) {
      this.drivers[driverIndex] = {
        ...this.drivers[driverIndex],
        ...updatedInfo,
      };
      this.saveDrivers();
      return this.drivers[driverIndex];
    }
    return null;
  }

  deleteDriver(id) {
    const initialLength = this.drivers.length;
    this.drivers = this.drivers.filter((driver) => driver.id !== id);

    if (this.drivers.length < initialLength) {
      this.saveDrivers();
      return true;
    }
    return false;
  }
}

export function initDriverManagement() {
  if (!isAuthenticated()) {
    window.location.href = "index.html";
    return;
  }

  const user = getCurrentUser();
  if (user.role !== "manager") {
    window.location.href = "index.html";
    return;
  }

  const driverManager = new DriverManager();
  const addDriverForm = document.getElementById("addDriverForm");
  const driversListContainer = document.getElementById("driversList");

  // Gestion du formulaire d'ajout de chauffeur
  addDriverForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const firstName = document.getElementById("driverFirstName").value;
    const lastName = document.getElementById("driverLastName").value;
    const username = document.getElementById("driverUsername").value;
    const password = document.getElementById("driverPassword").value;
    const email = document.getElementById("driverEmail").value;
    const phoneNumber = document.getElementById("driverPhone").value;

    try {
      const newDriver = driverManager.addDriver(
        firstName,
        lastName,
        username,
        password,
        email,
        phoneNumber
      );

      alert("Chauffeur ajouté avec succès");
      addDriverForm.reset();
      renderDriversList(driverManager);
    } catch (error) {
      alert(error.message);
    }
  });

  // Affichage initial de la liste des chauffeurs
  renderDriversList(driverManager);
}

function renderDriversList(driverManager) {
  const driversListContainer = document.getElementById("driversList");
  driversListContainer.innerHTML = ""; // Réinitialisation

  const drivers = driverManager.getDrivers();

  if (drivers.length === 0) {
    driversListContainer.innerHTML = "<p>Aucun chauffeur enregistré</p>";
    return;
  }

  const table = document.createElement("table");
  table.innerHTML = `
        <thead>
            <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Nom d'utilisateur</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

  const tbody = table.querySelector("tbody");

  drivers.forEach((driver) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${driver.lastName}</td>
            <td>${driver.firstName}</td>
            <td>${driver.username}</td>
            <td>${driver.email}</td>
            <td>${driver.phoneNumber}</td>
            <td>
                <button class="edit-driver" data-id="${driver.id}">Modifier</button>
                <button class="delete-driver" data-id="${driver.id}">Supprimer</button>
            </td>
        `;

    // Gestion des boutons de suppression
    const deleteBtn = row.querySelector(".delete-driver");
    deleteBtn.addEventListener("click", () => {
      if (confirm("Voulez-vous vraiment supprimer ce chauffeur ?")) {
        driverManager.deleteDriver(driver.id);
        renderDriversList(driverManager);
      }
    });

    tbody.appendChild(row);
  });

  driversListContainer.appendChild(table);
}
