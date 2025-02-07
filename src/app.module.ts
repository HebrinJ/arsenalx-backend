import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArmorsController } from './armor/armor.controller';
import { ArmorsService } from './armor/armor.service';
import { ArmorsModule } from './armor/armor.module';
import { CardsModule } from './cards/cards.module';
import { BbmModule } from './bbm/bbm.module';

@Module({
  imports: [ArmorsModule, CardsModule, BbmModule],
  controllers: [AppController, ArmorsController],
  providers: [AppService, ArmorsService],
})
export class AppModule {}
