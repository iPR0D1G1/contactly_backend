import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { FootPrint } from '../entities';
import { Pagination, PaginationOptionsInterface } from '../paginate';
import { FootPrintModel } from '../models';

@Injectable()
export class FootPrintService {
  constructor(
    @InjectRepository(FootPrint)
    private readonly footPrintRepository: Repository<FootPrint>,
  ) { }

  async paginate(
    options: PaginationOptionsInterface,
  ): Promise<Pagination<FootPrint>> {
    const [results, total] = await this.footPrintRepository.findAndCount({
      take: options.limit,
      skip: options.page, // think this needs to be page * limit
    });

    return new Pagination<FootPrint>({
      results,
      total,
    });
  }

  async create(contact: FootPrintModel): Promise<FootPrint> {
    return await this.footPrintRepository.save(this.footPrintRepository.create(contact));
  }

  async findById(id: number): Promise<FootPrint | null> {
    return await this.footPrintRepository.findOne(id);
  }

  async destroy(id: number): Promise<DeleteResult> {
    return await this.footPrintRepository.delete(id);
  }
}
