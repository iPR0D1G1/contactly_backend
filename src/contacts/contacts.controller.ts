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
import { ContactEntity, } from '../entities';
import { Pagination } from '../paginate';
import { ContactService } from './contacts.service';
import { ContactModel } from '../models';
import { UpdateResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@UseGuards(AuthGuard('jwt'))
@Controller('contacts')
@ApiTags('contacts')
@ApiBearerAuth()
export class ContactsController {
  constructor(private readonly contactService: ContactService) { }

  @Get()
  async index(@Request() request): Promise<Pagination<ContactEntity>> {
    return await this.contactService.paginate({
      limit: request.query.hasOwnProperty('limit') ? request.query.limit : 10,
      page: request.query.hasOwnProperty('page') ? request.query.page : 0,
    });
  }

  @Get('/:phonenumber')
  async show(@Param('phonenumber') phonenumber: string): Promise<ContactEntity> {
    const contact = await this.contactService.findByPhonenumber(phonenumber);

    if (!contact) {
      throw new NotFoundException();
    }
    return contact;
  }

  @Post()
  async create(
    @Body(new ValidationPipe()) body: ContactModel,
  ): Promise<ContactEntity> {
    const exists = await this.contactService.findByPhonenumber(body.phonenumber);

    if (exists) {
      throw new UnprocessableEntityException();
    }

    return await this.contactService.create(body);
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body(new ValidationPipe()) body: ContactModel,
  ): Promise<UpdateResult> {
    const blog = await this.contactService.findById(body.id);

    if (!blog) {
      throw new NotFoundException();
    }

    return await this.contactService.update({
      ...blog,
      ...body,
    });
  }
}
