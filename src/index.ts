interface IPig {
  id: number;
  name: string;
  breed: string;
  height: number;
  weight: number;
  personality: string;
  category: "Grey" | "Chestnut" | "White" | "Black";
  swimmingAbility?: number;
  language?: string;
  runningAbility?: number;
  strengthAbility?: number;
}

export class Pig implements IPig {
  static lastID = 0;
  id: number;
  name: string;
  breed: string;
  height: number;
  weight: number;
  personality: string;
  category: "Grey" | "Chestnut" | "White" | "Black";
  swimmingAbility?: number;
  language?: string;
  runningAbility?: number;
  strengthAbility?: number;

  constructor(
    name: string,
    breed: string,
    height: number,
    weight: number,
    personality: string,
    category: "Grey" | "Chestnut" | "White" | "Black",
    swimmingAbility?: number,
    language?: string,
    runningAbility?: number,
    strengthAbility?: number,
    id?: number
  ) {
    this.id = id ?? ++Pig.lastID;
    this.name = name;
    this.breed = breed;
    this.height = height;
    this.weight = weight;
    this.personality = personality;
    this.category = category;
    if (category === "Grey") this.swimmingAbility = swimmingAbility;
    else if (category === "Chestnut") this.language = language;
    else if (category === "White") this.runningAbility = runningAbility;
    else if (category === "Black") this.strengthAbility = strengthAbility;
  }

  static fromJSON(json: string): Pig {
    const data = JSON.parse(json);
    return new Pig(
      data.name,
      data.breed,
      data.height,
      data.weight,
      data.personality,
      data.category,
      data.swimmingAbility,
      data.language,
      data.runningAbility,
      data.strengthAbility,
      data.id
    );
  }
}

interface PigServices {
  add(p: Pig): void;
  getAll(): Pig[];
  delete(id: number): void;
}

export class PigController implements PigServices {
  private static readonly localStorageKey = 'PigArray';
  private static readonly lastIDKey = 'PigLastID';

  constructor() {
    const lastID = localStorage.getItem(PigController.lastIDKey);
    if (lastID) {
      Pig.lastID = parseInt(lastID, 10);
    }
  }

  add(p: Pig): void {
    const pigs = this.getAll();
    const newID = pigs.length > 0 ? Math.max(...pigs.map(p => p.id)) + 1 : 1;
    p.id = newID;
    pigs.push(p);
    this.savePigs(pigs);
    Pig.lastID = newID;
    localStorage.setItem(PigController.lastIDKey, newID.toString());
  }

  getAll(): Pig[] {
    const pigsJson = localStorage.getItem(PigController.localStorageKey);
    if (!pigsJson) return [];
    try {
      const pigsArray = JSON.parse(pigsJson);
      return pigsArray.map((pigData: any) => new Pig(
        pigData.name,
        pigData.breed,
        pigData.height,
        pigData.weight,
        pigData.personality,
        pigData.category,
        pigData.swimmingAbility,
        pigData.language,
        pigData.runningAbility,
        pigData.strengthAbility,
        pigData.id
      ));
    } catch (error) {
      console.error('Error parsing pigs from localStorage:', error);
      return [];
    }
  }

  delete(id: number): void {
    const pigs = this.getAll().filter(pig => pig.id !== id);
    this.savePigs(pigs);
  }

  private savePigs(pigs: Pig[]): void {
    localStorage.setItem(PigController.localStorageKey, JSON.stringify(pigs));
  }
}