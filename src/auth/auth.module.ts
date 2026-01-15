import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true, // This makes the JwtService available to your entire app
      secret: process.env.JWT_SECRET, // We'll need to add this to a .env file
      signOptions: { expiresIn: '1d' }, // e.g., token expires in 1 day
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
