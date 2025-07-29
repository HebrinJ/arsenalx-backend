import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardsModule } from './cards/cards.module';
import { BbmModule } from './bbm/bbm.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '/images'),
      serveRoot: '/images/',
    }),
    CardsModule,
    BbmModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
