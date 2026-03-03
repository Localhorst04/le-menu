import { Controller, Get, NotFoundException} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TagsDto } from './dto/tags.dto';
import { TagsService } from './tags.service';

@ApiTags('tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get('all-tags')
  async findAll(): Promise<TagsDto[]> {
    const tags = await this.tagsService.getTags();
    if (!tags) {
      throw new NotFoundException('No tags found');
    }
    return tags;
  }
}
