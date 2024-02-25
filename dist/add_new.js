import { Pig, PigController } from "./index.js";
const pigController = new PigController();
document.addEventListener("DOMContentLoaded", () => {
    const categorySelect = document.getElementById("category");
    categorySelect.addEventListener("change", handleCategoryChange);
    const inputForm = document.getElementById("add-new-pig-form");
    inputForm.addEventListener("submit", handleFormSubmit);
});
function handleCategoryChange() {
    const dynamicInputDiv = document.getElementById("dynamic");
    dynamicInputDiv.innerHTML = "";
    const categorySelect = document.getElementById("category");
    const category = categorySelect.value;
    const attributes = {
        "Grey": { name: "Swimming Ability", type: "number", min: 0, max: 100 },
        "Chestnut": { name: "Language", type: "text" },
        "White": { name: "Running Ability", type: "number", min: 0, max: 100 },
        "Black": { name: "Strength Ability", type: "number", min: 1, max: 10 },
    };
    const attribute = attributes[category];
    if (attribute) {
        createInput(attribute.name, attribute.name.toLowerCase().replace(/ /g, ""), attribute.type, attribute.name.toLowerCase().replace(/ /g, ""), attribute.min, attribute.max);
    }
}
function createInput(labelText, id, type, name, min, max) {
    const dynamicInputDiv = document.getElementById("dynamic");
    const inputGroupDiv = document.createElement("div");
    inputGroupDiv.classList.add("mb-3", "row");
    const label = document.createElement("label");
    label.classList.add("col-sm-2", "col-form-label");
    label.htmlFor = id;
    label.textContent = labelText;
    const inputColDiv = document.createElement("div");
    inputColDiv.classList.add("col-sm-10");
    const input = document.createElement("input");
    input.type = type;
    input.required = true;
    input.classList.add("form-control");
    input.id = id;
    input.name = name;
    if (type === "number") {
        if (min !== undefined) {
            input.min = min.toString();
        }
        if (max !== undefined) {
            input.max = max.toString();
        }
    }
    inputColDiv.appendChild(input);
    inputGroupDiv.appendChild(label);
    inputGroupDiv.appendChild(inputColDiv);
    dynamicInputDiv.appendChild(inputGroupDiv);
}
function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const pig = new Pig(formData.get("name"), formData.get("breed"), parseInt(formData.get("height")), parseInt(formData.get("weight")), formData.get("personality"), formData.get("category"), parseInt(formData.get("swimmingability")), formData.get("language"), parseInt(formData.get("runningability")), parseInt(formData.get("strengthability")));
    pigController.add(pig);
    window.location.href = "./main.html";
}
