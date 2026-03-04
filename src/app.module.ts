import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { RecipeModule } from './recipe/recipe.module';

@Module({
  imports: [PrismaModule, AuthModule, RecipeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
