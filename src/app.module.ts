import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TagsModule } from './tags/tags.module';
import { RecipeModule } from './recipe/recipe.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, TagsModule, RecipeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
