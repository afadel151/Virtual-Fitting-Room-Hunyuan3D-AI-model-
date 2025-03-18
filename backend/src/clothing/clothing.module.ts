import { Module } from '@nestjs/common';
import { ClothingController } from './clothing.controller';
import { ClothingService } from './clothing.service';
import { Model3DService } from 'src/model-3d/model-3d.service';

@Module({
  controllers: [ClothingController],
  providers: [ClothingService,Model3DService]
})
export class ClothingModule {}
