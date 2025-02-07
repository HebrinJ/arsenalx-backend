import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardsModule } from './cards/cards.module';
import { BbmModule } from './bbm/bbm.module';

@Module({
  imports: [CardsModule, BbmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
