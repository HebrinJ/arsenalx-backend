import { Card } from 'src/cards/card';
import { BBM, TANK } from 'src/constants/unitTypesConstants';
import { getDataFromFile } from './getDataFromFile';

type TCardType = {
  id: string;
  group: string;
  type: string;
  mainImage: string;
  general: {
    endOfDevelopYear: number;
    developer: string;
    country: string;
    unitName: string;
  };
};

export function getCardListByType(type: string): Array<Card> {
  const fileName = getDataFileNameByUnitType(type);
  const unitsList = getDataFromFile(fileName);

  const cardList = unitsList.map((unit: TCardType) => {
    const card = new Card(
      unit.id,
      unit.group,
      unit.type,
      unit.general.endOfDevelopYear,
      unit.general.developer,
      unit.general.country,
      unit.mainImage,
      unit.general.unitName,
    );
    validateFields(card);
    return card;
  });
  return cardList;
}

function getDataFileNameByUnitType(type: string): string {
  switch (type) {
    case BBM:
      return 'bbmData.json';
    case TANK:
      return 'tankData.json';
    default:
      return 'file not found';
  }
}

function validateFields(card: any) {
  for (const field in card) {
    if (!card[field]) {
      throw new Error(`Сведения ${field} по id ${card.id} с названием ${card.unitName} не заполнены`);
    }
  }
}
