import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    login(loginDto: LoginDto): Promise<string | null>;
    private generateToken;
    isUser(req: Request): boolean;
}
