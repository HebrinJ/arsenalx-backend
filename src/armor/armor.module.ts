import { Module } from '@nestjs/common';
import { ArmorsService } from './armor.service';
import { ArmorsController } from './armor.controller';

@Module({
  imports: [],
  providers: [ArmorsService],
  controllers: [ArmorsController],
  exports: [ArmorsService],
})
export class ArmorsModule {}
