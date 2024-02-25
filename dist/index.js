export class Pig {
    constructor(name, breed, height, weight, personality, category, swimmingAbility, language, runningAbility, strengthAbility, id) {
        this.id = id !== null && id !== void 0 ? id : ++Pig.lastID;
        this.name = name;
        this.breed = breed;
        this.height = height;
        this.weight = weight;
        this.personality = personality;
        this.category = category;
        if (category === "Grey")
            this.swimmingAbility = swimmingAbility;
        else if (category === "Chestnut")
            this.language = language;
        else if (category === "White")
            this.runningAbility = runningAbility;
        else if (category === "Black")
            this.strengthAbility = strengthAbility;
    }
    static fromJSON(json) {
        const data = JSON.parse(json);
        return new Pig(data.name, data.breed, data.height, data.weight, data.personality, data.category, data.swimmingAbility, data.language, data.runningAbility, data.strengthAbility, data.id);
    }
}
Pig.lastID = 0;
export class PigController {
    constructor() {
        const lastID = localStorage.getItem(PigController.lastIDKey);
        if (lastID) {
            Pig.lastID = parseInt(lastID, 10);
        }
    }
    add(p) {
        const pigs = this.getAll();
        const newID = pigs.length > 0 ? Math.max(...pigs.map(p => p.id)) + 1 : 1;
        p.id = newID;
        pigs.push(p);
        this.savePigs(pigs);
        Pig.lastID = newID;
        localStorage.setItem(PigController.lastIDKey, newID.toString());
    }
    getAll() {
        const pigsJson = localStorage.getItem(PigController.localStorageKey);
        if (!pigsJson)
            return [];
        try {
            const pigsArray = JSON.parse(pigsJson);
            return pigsArray.map((pigData) => new Pig(pigData.name, pigData.breed, pigData.height, pigData.weight, pigData.personality, pigData.category, pigData.swimmingAbility, pigData.language, pigData.runningAbility, pigData.strengthAbility, pigData.id));
        }
        catch (error) {
            console.error('Error parsing pigs from localStorage:', error);
            return [];
        }
    }
    delete(id) {
        const pigs = this.getAll().filter(pig => pig.id !== id);
        this.savePigs(pigs);
    }
    savePigs(pigs) {
        localStorage.setItem(PigController.localStorageKey, JSON.stringify(pigs));
    }
}
PigController.localStorageKey = 'PigArray';
PigController.lastIDKey = 'PigLastID';
