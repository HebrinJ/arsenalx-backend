import { Injectable } from '@nestjs/common';
import { getCardListByType } from 'src/utils/getCardListByType';
import { Card } from './card';

@Injectable()
export class CardsService {
  async loadCardList(type: string): Promise<Readonly<Card[]>> {
    return await getCardListByType(type);
  }
}
