import { PigController } from './index.js';
const pigController = new PigController();
document.addEventListener("DOMContentLoaded", () => {
    populatePigsTable();
    openAddNewPage();
});
function populatePigsTable() {
    const pigs = pigController.getAll();
    console.log(pigs);
    const tableBody = document.getElementById("display-table");
    tableBody.innerHTML = "";
    if (pigs.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" style="text-align: center;">No entries made</td></tr>`;
    }
    else {
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
window.showMoreInfo = (event) => {
    event.preventDefault();
    const button = event.target;
    const pigId = button.getAttribute("data-id");
    if (pigId) {
        localStorage.setItem('currentPigId', pigId);
        window.location.href = './more_info.html';
    }
    else {
        console.error('Could not find pig ID.');
    }
};
window.deletePig = (id) => {
    pigController.delete(id);
    populatePigsTable();
};
function openAddNewPage() {
    const addButton = document.getElementById("addButton");
    addButton === null || addButton === void 0 ? void 0 : addButton.addEventListener("click", () => {
        window.location.href = "./add_new.html";
    });
}
