import { Pig, PigController } from './index.js';

const pigController = new PigController();

document.addEventListener("DOMContentLoaded", () => {
  populatePigsTable();
  openAddNewPage();
});

function populatePigsTable(): void {
  const pigs = pigController.getAll();
  console.log(pigs);
  const tableBody = document.getElementById("display-table") as HTMLTableSectionElement;

  tableBody.innerHTML = "";

  if (pigs.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center;">No entries made</td></tr>`;
  } else {
    pigs.forEach((pig, index) => {
      const row = tableBody.insertRow();
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${pig.name}</td>
        <td>${pig.category}</td>
        <td><button class="btn btn-info" data-id="${pig.id}" onclick="showMoreInfo(event)">More info</button></td>
        <td><button class="btn btn-danger" onclick="deletePig(${pig.id})">Delete</button></td>
      `;
    });
  }
}

window.showMoreInfo = (event: Event) => {
    event.preventDefault();
    const button = event.target as HTMLButtonElement
    const pigId = button.getAttribute("data-id");

    if (pigId) {
        localStorage.setItem('currentPigId', pigId);
        window.location.href = './more_info.html';
    } else {
        console.error('Could not find pig ID.');
    }
};

window.deletePig = (id: number) => {
    pigController.delete(id);
    populatePigsTable();
};

function openAddNewPage(): void {
    const addButton = document.getElementById("addButton");
    addButton?.addEventListener("click", () => {
    window.location.href = "./add_new.html";
  });
}

declare global {
  interface Window {
    deletePig: (id: number) => void;
    showMoreInfo: (event: Event) => void;
  }
}