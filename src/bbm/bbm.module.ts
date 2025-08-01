import { Module } from '@nestjs/common';
import { BbmService } from './bbm.service';
import { BbmController } from './bbm.controller';
import { BbmDataRepo } from './bbm.repo';

@Module({
  imports: [],
  providers: [
    BbmService,
    {
      provide: 'IBbmDataRepo',
      useClass: BbmDataRepo,
    },
    BbmDataRepo,
  ],
  controllers: [BbmController],
  exports: [BbmService],
})
export class BbmModule {}
