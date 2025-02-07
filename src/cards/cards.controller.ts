import { Controller, Get, Param } from '@nestjs/common';
import { CardsService } from './cards.service';

@Controller()
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @Get('/list/:type')
  getUnitsListByType(@Param('type') type: string) {
    return this.cardsService.loadCardList(type);
  }
}
