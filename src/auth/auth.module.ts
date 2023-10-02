require("dotenv").config();
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Users } from './user.entity';
import { LocalStrategy } from './local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt-strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [PassportModule,
            TypeOrmModule.forFeature([Users]),
            JwtModule.register({
                secret: process.env.JWT_CONSTANT_SECRET,
                signOptions: {expiresIn: '1d'},
            })],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
