import { Module } from '@nestjs/common';
import { BbmService } from './bbm.service';
import { BbmController } from './bbm.controller';

@Module({
  imports: [],
  providers: [BbmService],
  controllers: [BbmController],
  exports: [BbmService],
})
export class BbmModule {}
