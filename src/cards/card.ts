export class Card {
  id: string;
  group: string;
  type: string;
  year: number;
  developer: string;
  country: string;
  image: string;
  unitName: string;

  constructor(
    id: string,
    group: string,
    type: string,
    year: number,
    developer: string,
    country: string,
    image: string,
    unitName: string,
  ) {
    this.id = id;
    this.group = group;
    this.type = type;
    this.year = year;
    this.developer = developer;
    this.country = country;
    this.image = image;
    this.unitName = unitName;
  }
}
