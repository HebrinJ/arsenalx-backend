import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BbmService } from './bbm.service';
//import { TBbmDataType } from 'src/types/units/armor/bbmDataType';
import { Bbm } from 'src/units/bbm';
import * as fs from 'fs';

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
  editBbmEntry(@Body() bbmDto: Bbm, @Param('id') id: string) {
    return this.bbmService.editBbmEntry(id, bbmDto);
  }

  // @Patch('bbm/:id/image')
  // setMainImage(@Body() image: File, @Param('id') id: string) {
  //   return this.bbmService.setMainImage(id, image.name);
  // }

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

  @Post('bbm/:id/mainimage')
  @UseInterceptors(FileInterceptor('file'))
  async uploadMainImageFile(@UploadedFile() file: Express.Multer.File, @Body() body: any) {    
    const uploadDir = './src/images/bbm';

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = file.originalname;
    const filePath = `${uploadDir}/${fileName}`;

    fs.writeFileSync(filePath, file.buffer);
    this.bbmService.setMainImage(body.id, fileName);
    return { message: 'Файл успешно загружен', fileName };
  }

  @Post('bbm/:id/cardimage')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCardImageFile(@UploadedFile() file: Express.Multer.File, @Body() body: any) {    
    const uploadDir = './src/images/bbm';

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = file.originalname;
    const filePath = `${uploadDir}/${fileName}`;

    fs.writeFileSync(filePath, file.buffer);
    this.bbmService.setCardImage(body.id, fileName);
    return { message: 'Файл успешно загружен', fileName };
  }
}
