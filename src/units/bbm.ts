export class Bbm {
  id: string;
  group: string;
  type: string;
  mainImage: string;
  general: {
    unitName: string;
    endOfDevelop: number;
    productionYears: string;
    country: string;
    developer: string;
    productCount: number;
    classification: string;
    weight: string;
    layout: string;
    crew: string;
    cost: string;
  };
  defence: {
    defenceType: string;
    thickness: string;
    defenceEquip: string;
    dynamicArmor: string;
    activeArmor: string;
  };
  dimensions: {
    length: string;
    lengthWithGun: string;
    width: string;
    height: string;
    clearance: string;
  };
  offensive: {
    mainGun: string;
    secondGun: string;
    caliber: string;
    gunType: string;
    stab: string;
    ammunition: string;
    ammunitionType: string;
    edges: string;
    aim: string;
    addition: string;
  };
  mobility: {
    engine: string;
    power: string;
    specificPower: string;
    roadSpeed: string;
    offroadSpeed: string;
    roadRange: string;
    offroadRange: string;
    suspensionType: string;
    groundPress: string;
    ascentOver: string;
    ascentWall: string;
    ascentMoat: string;
    ascentFord: string;
  };
  equipment: {
    radio: string;
    commandAim: string;
  };
  description: string;
  gallery: Array<string>;

  constructor(id: string, unitName: string) {
    this.id = id;
    this.group = 'ARMOR';
    this.type = 'BBM';
    this.mainImage = 'нет данных';
    this.general = {
      unitName: unitName,
      endOfDevelop: 0,
      productionYears: 'нет данных',
      country: 'нет данных',
      developer: 'нет данных',
      productCount: 0,
      classification: 'нет данных',
      weight: 'нет данных',
      layout: 'нет данных',
      crew: 'нет данных',
      cost: 'нет данных',
    };
    this.defence = {
      defenceType: 'нет данных',
      thickness: 'нет данных',
      defenceEquip: 'нет данных',
      dynamicArmor: 'нет данных',
      activeArmor: 'нет данных',
    };
    this.dimensions = {
      length: 'нет данных',
      lengthWithGun: 'нет данных',
      width: 'нет данных',
      height: 'нет данных',
      clearance: 'нет данных',
    };
    this.offensive = {
      mainGun: 'нет данных',
      secondGun: 'нет данных',
      caliber: 'нет данных',
      gunType: 'нет данных',
      stab: 'нет данных',
      ammunition: 'нет данных',
      ammunitionType: 'нет данных',
      edges: 'нет данных',
      aim: 'нет данных',
      addition: 'нет данных',
    };
    this.mobility = {
      engine: 'нет данных',
      power: 'нет данных',
      specificPower: 'нет данных',
      roadSpeed: 'нет данных',
      offroadSpeed: 'нет данных',
      roadRange: 'нет данных',
      offroadRange: 'нет данных',
      suspensionType: 'нет данных',
      groundPress: 'нет данных',
      ascentOver: 'нет данных',
      ascentWall: 'нет данных',
      ascentMoat: 'нет данных',
      ascentFord: 'нет данных',
    };
    this.equipment = {
      radio: 'нет данных',
      commandAim: 'нет данных',
    };
    this.description = 'нет данных';
    this.gallery = [''];
  }
}
