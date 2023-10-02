import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Users } from './user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(
        private usersService: AuthService
    ){}

    @Post('signup')
    async signup(@Body() user: Users): Promise<any> {
        return this.usersService.signup(user);
    }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        return this.usersService.login(req.user)
    }
}
