import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  find(): string {
    return 'Home route called for the turorial app';
  }
}
