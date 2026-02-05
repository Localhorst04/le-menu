import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { TagsDto } from './dto/tags.dto';

@Injectable()
export class TagsService {
  constructor(private readonly prisma: PrismaClient) {}

  async getTags(): Promise<TagsDto[] | null> {
    const tags = await this.prisma.tag.findMany({
      select: { id: true, name: true },
    });

    if (!tags) return null;

    return tags;
  }
}
