import { Injectable } from '@nestjs/common';
import { getCardListByType } from 'src/utils/getCardListByType';
import { Card } from './card';

@Injectable()
export class CardsService {
  private cardList: Array<Card> = [];

  loadCardList(type: string) {
    this.cardList = getCardListByType(type);
    return this.cardList;
  }
}
