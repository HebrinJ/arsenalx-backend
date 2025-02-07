import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { BbmService } from './bbm.service';
import { TBbmDataType } from 'src/types/units/armor/bbmDataType';

type CreateEntryDto = {
  unitName: string;
};

@Controller()
export class BbmController {
  constructor(private bbmService: BbmService) {}

  @Get('bbm/:id')
  findUnitById(@Param('id') id: string) {
    return this.bbmService.findUnitById(id);
  }

  @Patch('bbm/:id')
  editBbmEntry(@Body() bbmDto: TBbmDataType, @Param('id') id: string) {
    return this.bbmService.editBbmEntry(id, bbmDto);
  }

  @Post('bbm')
  addNewEmptyEntry(@Body() createEntryDto: CreateEntryDto) {
    return this.bbmService.addNewEmptyEntry(createEntryDto.unitName);
  }

  @Get('getbbmlist')
  getBbmList() {
    return this.bbmService.getBbmList();
  }

  @Delete('bbm/:id')
  removeBbm(@Param('id') id: string) {
    return this.bbmService.removeBbm(id);
  }
}
