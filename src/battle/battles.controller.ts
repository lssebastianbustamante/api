import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateRegisterDto } from './dto/create-register.dto';
import { BattlesService } from './battles.service';

@Controller('battles')
export class BattlesController {
  constructor(private battlesService: BattlesService) {}

  @Get()
  getBattles() {
    return this.battlesService.getBattles();
  }
  @Post()
  createRegister(@Body() battle: CreateRegisterDto) {
    return this.battlesService.createRegister(battle);
  }
}
