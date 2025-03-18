import { Module } from '@nestjs/common';
import { Model3dController } from './model-3d.controller';

@Module({
  controllers: [Model3dController]
})
export class Model3dModule {}
