import { Body, Controller, Post } from '@nestjs/common';
import { AuthDTO } from 'src/dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDTO) {
    console.log(dto);
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin() {
    return this.authService.login();
  }
}
