import { Controller, Get, Param } from '@nestjs/common';
import { ArmorsService } from './armor.service';
import { readFileSync } from 'fs';
import { join } from 'path';

type TArmorUnit = {
  id: string;
  type: string;
  mainImage: string;
  main: {
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
    type: string;
    vld: string;
    nld: string;
    side: string;
    back: string;
    roof: string;
    turretFront: string;
    gunMask: string;
    turretSide: string;
    turretBack: string;
    defenceEquip: string;
    dinamicArmor: string;
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
    range: string;
    aim: string;
    addition: string;
  };
  mobility: {
    engine: string;
    power: string;
    roadSpeed: string;
    offroadSpeed: string;
    roadRange: string;
    offroadRange: string;
    specificPower: string;
    suspensionType: string;
    trackWidth: string;
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
};

@Controller()
export class ArmorsController {
  constructor(private armorsService: ArmorsService) {}
  //   @Get(':id')
  //   async findUserByName(@Param('id') id: string): Promise<UserPublicProfileDto> {
  //     const unit: Armor = await this.armorsService.findUnitById(id);
  //     return entityToDtoTransform<User, UserPublicProfileDto>(user, UserPublicProfileDto);
  //   }

  //   @Post()
  //   async addUnitToDB() {
  //   }

  @Get('/item/:id')
  findUnit(@Param('id') id: string) {
    const filePath = join(__dirname, '..', '/jsondata', 'armorData.json');
    const jsonData = readFileSync(filePath, 'utf-8');
    const allUnitsData: Array<TArmorUnit> = JSON.parse(jsonData);

    const unitData = allUnitsData.find((unit: TArmorUnit) => unit.id === id);

    return unitData;
  }
}
