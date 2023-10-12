import { BadRequestException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users) private userRepository: Repository<Users>, private jwt: JwtService
    ) {}

    async signup(user: Users): Promise<Users> {
        const email = user.email;
        const userExist = await this.userRepository.findOne({where: {email}})

        if(userExist) {
            throw new BadRequestException();
        }

        // console.log(user)
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash
        return await this.userRepository.save(user);
    }

    async validateUser(username: string, password: string): Promise<any> {
        const foundUser = await this.userRepository.findOne({where: {username}});
        if(foundUser) {
            if(await bcrypt.compare(password, foundUser.password)) {
                const { password, ...result } = foundUser
                return result; 
            } return null;
        } return null;
    }

    async login(user: Users) {
        const payload = { username: user.username, sub: user.id, role: user.role }
        // console.log(payload)
        return {
            user: payload,
            access_token: this.jwt.sign(payload)
        }
    }

    getUserInfo(jwtToken: string) {
        const decodedStr = this.jwt.decode(jwtToken)
        return decodedStr;
    }
}
