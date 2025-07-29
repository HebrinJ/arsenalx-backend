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
import { Bbm } from 'src/units/bbm';
import * as fs from 'fs';

type CreateEntryDto = {
  unitName: string;
};

@Controller()
export class BbmController {
  constructor(private bbmService: BbmService) {}

  @Get('bbm/:id')
  async findUnitById(@Param('id') id: string) {
    return this.bbmService.findUnitById(id);
  }

  @Patch('bbm/:id')
  async editBbmEntry(@Body() bbmDto: Bbm, @Param('id') id: string) {
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

  @Post('bbm/:id/mainimage')
  @UseInterceptors(FileInterceptor('file'))
  async uploadMainImageFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any) {
    this.uploadImageFile(file, body, 'mainImage');
  }

  @Post('bbm/:id/cardimage')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCardImageFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: any) {
    this.uploadImageFile(file, body, 'cardImage');
  }

  async uploadImageFile(
    file: Express.Multer.File,
    body: any,
    imageType: 'mainImage' | 'cardImage',
  ) {
    const uploadDir = './src/images/bbm';

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = file.originalname;
    const filePath = `${uploadDir}/${fileName}`;

    fs.writeFileSync(filePath, file.buffer);
    await this.bbmService.setImage(body.id, fileName, imageType);
    return { message: 'Файл успешно загружен', fileName };
  }
}
