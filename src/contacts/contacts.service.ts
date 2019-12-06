import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { ContactEntity } from '../entities';
import { Pagination, PaginationOptionsInterface } from '../paginate';
import { SlugProvider } from './slug.provider';
import { ContactModel } from '../models';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactEntity)
    private readonly contactRepository: Repository<ContactEntity>,
    private readonly slugProvider: SlugProvider,
  ) { }

  async paginate(
    options: PaginationOptionsInterface,
  ): Promise<Pagination<ContactEntity>> {
    const [results, total] = await this.contactRepository.findAndCount({
      take: options.limit,
      skip: options.page, // think this needs to be page * limit
    });

    // TODO add more tests for paginate

    return new Pagination<ContactEntity>({
      results,
      total,
    });
  }

  async create(contact: ContactModel): Promise<ContactEntity> {
    // blog = await this.uniqueSlug(blog);
    return await this.contactRepository.save(this.contactRepository.create(contact));
  }

  async update(contact: ContactEntity): Promise<UpdateResult> {
    return await this.contactRepository.update(contact.id, contact);
  }

  async findById(id: number): Promise<ContactEntity | null> {
    return await this.contactRepository.findOne(id);
  }

  async findByPhonenumber(phonenumber: string): Promise<ContactEntity | null> {
    return await this.contactRepository.findOne({
      where: {
        slug: phonenumber,
      },
    });
  }

  async destroy(id: number): Promise<DeleteResult> {
    return await this.contactRepository.delete(id);
  }

  // async uniqueSlug(blog: ContactModel): Promise<ContactModel> {
  //   blog.slug = await this.slugProvider.slugify(blog.title);
  //   const exists = await this.findSlugs(blog.slug);

  //   // if slug doesn't already exists
  //   if (!exists || exists.length === 0) {
  //     return blog;
  //   }

  //   // Omit if same entity
  //   if (exists.length === 1 && blog.id === exists[0].id) {
  //     return blog;
  //   }

  //   // Add to suffix
  //   blog.slug = blog.slug + this.slugProvider.replacement() + exists.length;

  //   return blog;
  // }

  // private async findSlugs(slug: string): Promise<ContactEntity[]> {
  //   return await this.contactRepository
  //     .createQueryBuilder('blog')
  //     .where('slug like :slug', { slug: `${slug}%` })
  //     .getMany();
  // }
}
