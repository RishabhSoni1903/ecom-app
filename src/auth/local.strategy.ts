import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy } from 'passport-local'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor (private authService: AuthService) {
        super()
    }
    
    async validate(username: string, password: string) {
        const foundUser = await this.authService.validateUser(username, password)
        // console.log(foundUser)
        if(!foundUser) {
            throw new UnauthorizedException();
        }
        return foundUser;
    }
}
