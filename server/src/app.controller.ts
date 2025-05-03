import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExcludeController } from '@nestjs/swagger';
import { IsPublic } from './shared/decorators/auth.decorators';


@Controller()
@ApiExcludeController()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @IsPublic()
  getHomePage(): string {
    return this.appService.getPage();
  }
}
