import { Controller, Get, Param } from '@nestjs/common';
import { CardsService } from './cards.service';
import { NotFoundException } from '@nestjs/common';

@Controller()
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @Get('/list/:type')
  async getUnitsListByType(@Param('type') type: string) {
    const cards = await this.cardsService.loadCardList(type);
    if (!cards.length) {
      throw new NotFoundException(`Нет карточек типа: ${type}`);
    }
    return cards;
  }
}
