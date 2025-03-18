import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ClothingModule } from './clothing/clothing.module';
import { FittingModule } from './fitting/fitting.module';
import { PrismaModule } from './prisma/prisma.module';
import { Model3DService } from './model-3d/model-3d.service';
import { Model3dModule } from './model-3d/model-3d.module';
import { ClothingController } from './clothing/clothing.controller';

@Module({
  imports: [AuthModule, UsersModule, ClothingModule, FittingModule, PrismaModule, Model3dModule],
  controllers: [AppController,ClothingController],
  providers: [AppService,Model3DService, Model3DService],
})
export class AppModule {}
