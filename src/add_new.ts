import { Pig, PigController } from "./index.js";

const pigController = new PigController();

document.addEventListener("DOMContentLoaded", () => {
  const categorySelect = document.getElementById("category") as HTMLSelectElement;
  categorySelect.addEventListener("change", handleCategoryChange);

  const inputForm = document.getElementById("add-new-pig-form") as HTMLFormElement;
  inputForm.addEventListener("submit", handleFormSubmit);
});

type CategoryAttributes = {
    [key: string]: { name: string; type: string; min?: number; max?: number };
};

function handleCategoryChange(): void {
  const dynamicInputDiv = document.getElementById("dynamic") as HTMLDivElement;
  dynamicInputDiv.innerHTML = "";

  const categorySelect = document.getElementById("category") as HTMLSelectElement;
  const category = categorySelect.value;

  const attributes: CategoryAttributes = {
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

function createInput(labelText: string, id: string, type: string, name: string, min?: number, max?: number): void {
    const dynamicInputDiv = document.getElementById("dynamic") as HTMLDivElement;
  
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

    if(type === "number") {
        if(min !== undefined) {
            input.min = min.toString();
        }
        if(max !== undefined) {
            input.max = max.toString();
        }
    }
  
    inputColDiv.appendChild(input);
    inputGroupDiv.appendChild(label);
    inputGroupDiv.appendChild(inputColDiv);
  
    dynamicInputDiv.appendChild(inputGroupDiv);
  }

function handleFormSubmit(event: Event): void {
  event.preventDefault();

  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);

  const pig = new Pig(
    formData.get("name") as string,
    formData.get("breed") as string,
    parseInt(formData.get("height") as string),
    parseInt(formData.get("weight") as string),
    formData.get("personality") as string,
    formData.get("category") as "Grey" | "Chestnut" | "White" | "Black",
    parseInt(formData.get("swimmingability") as string),
    formData.get("language") as string,
    parseInt(formData.get("runningability") as string),
    parseInt(formData.get("strengthability") as string)
  );

  pigController.add(pig);
  window.location.href = "./main.html";
}
