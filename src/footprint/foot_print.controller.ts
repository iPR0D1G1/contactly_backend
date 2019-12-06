import {
  Controller,
  Get,
  Put,
  Post,
  Param,
  Request,
  NotFoundException,
  Body,
  ValidationPipe,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { FootPrint, } from '../entities';
import { Pagination } from '../paginate';
import { FootPrintService } from './foot_print.service';
import { FootPrintModel } from '../models';
import { UpdateResult } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';

@Controller('footprint')
@ApiTags('footprint')
export class FootPrintController {
  constructor(private readonly footPrintService: FootPrintService) { }

  @Get()
  async index(@Request() request): Promise<Pagination<FootPrint>> {
    return await this.footPrintService.paginate({
      limit: request.query.hasOwnProperty('limit') ? request.query.limit : 10,
      page: request.query.hasOwnProperty('page') ? request.query.page : 0,
    });
  }

  @Get('/:id')
  async update(@Param('id') id: number): Promise<FootPrint> {
    const footPrint =  await this.footPrintService.findById(id);
    if(!footPrint){
      throw new NotFoundException(`footprint with id $:id not found`)
    }
    return footPrint
  }

  @Post()
  async create(
    @Body(new ValidationPipe()) body: FootPrintModel,
  ): Promise<FootPrint> {
    return await this.footPrintService.create(body);
  }
}
