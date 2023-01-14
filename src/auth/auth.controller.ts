import { Body, Controller, Post } from '@nestjs/common';
import { AuthDTO } from '../auth/dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDTO) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: AuthDTO) {
    return this.authService.login(dto);
  }
}
