import { readFileSync } from 'fs';
import { join } from 'path';
import { Card } from 'src/cards/card';

type TCardType = {
  id: string;
  group: string;
  type: string;
  year: number;
  developer: string;
  country: string;
  image: string;
  unitName: string;
};

export function getCardListByType(type: string): Array<Card> {
  const fileName = getDataFileNameByUnitType(type);

  const filePath = join(__dirname, '..', '/jsondata', fileName);
  const jsonData = readFileSync(filePath, 'utf-8');

  const unitsList = JSON.parse(jsonData);

  const cardList = unitsList.map((unit: TCardType) => {
    const card = new Card(
      unit.id,
      unit.group,
      unit.type,
      unit.year,
      unit.developer,
      unit.country,
      unit.image,
      unit.unitName,
    );

    validateFields(card);
    return card;
  });
  return cardList;
}

function getDataFileNameByUnitType(type: string): string {
  switch (type) {
    case 'BBM':
      return 'bbmData.json';
    default:
      return 'file not found';
  }
}

function validateFields(card: any) {
  for (const field in card) {
    if (!card[field]) {
      throw new Error(`Сведения ${field} по id ${card.id} не заполнены`);
    }
  }
}
