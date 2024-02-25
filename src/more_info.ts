import { Pig, PigController } from "./index.js";

const pigController = new PigController();

document.addEventListener("DOMContentLoaded", () => {
  const pigId = localStorage.getItem('currentPigId');
  if (pigId) {
    const pig = pigController.getAll().find(p => p.id.toString() === pigId);
    if (pig) {
      populateMoreInfoTable(pig);
    } else {
      console.error('Pig not found.');
    }
  } else {
    console.error('No pig ID found in localStorage.');
  }
});

function populateMoreInfoTable(pig: Pig): void {
  const tableBody = document.getElementById("more-info-table") as HTMLTableSectionElement;
  tableBody.innerHTML = "";

  tableBody.innerHTML += `
    <tr>
      <th scope="row" class="table-light">Name</th>
      <td>${pig.name}</td>
    </tr>
    <tr>
      <th scope="row" class="table-light">Breed</th>
      <td>${pig.breed}</td>
    </tr>
    <tr>
      <th scope="row" class="table-light">Height</th>
      <td>${pig.height}</td>
    </tr>
    <tr>
      <th scope="row" class="table-light">Weight</th>
      <td>${pig.weight}</td>
    </tr>
    <tr>
      <th scope="row" class="table-light">Personality</th>
      <td>${pig.personality}</td>
    </tr>
  `;

  if (pig.category === "Grey" && pig.swimmingAbility !== undefined) {
    tableBody.innerHTML += `
      <tr>
        <th scope="row" class="table-light">Swimming Ability</th>
        <td>${pig.swimmingAbility}</td>
      </tr>
    `;
  } else if (pig.category === "Chestnut" && pig.language) {
    tableBody.innerHTML += `
      <tr>
        <th scope="row" class="table-light">Language</th>
        <td>${pig.language}</td>
      </tr>
    `;
  } else if (pig.category === "White" && pig.runningAbility !== undefined) {
    tableBody.innerHTML += `
      <tr>
        <th scope="row" class="table-light">Running Ability</th>
        <td>${pig.runningAbility}</td>
      </tr>
    `;
  } else if (pig.category === "Black" && pig.strengthAbility !== undefined) {
    tableBody.innerHTML += `
      <tr>
        <th scope="row" class="table-light">Strength Ability</th>
        <td>${pig.strengthAbility}</td>
      </tr>
    `;
  }
}