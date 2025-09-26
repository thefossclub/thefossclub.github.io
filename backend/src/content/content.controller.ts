import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  Query,
  HttpCode,
  HttpStatus,
  NotFoundException 
} from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentDto, CreateContentDto, UpdateContentDto } from './dto/content.dto';

@Controller('content')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  @Get()
  findAll(@Query('type') type?: string): ContentDto[] {
    if (type) {
      return this.contentService.findByType(type);
    }
    return this.contentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): ContentDto {
    const content = this.contentService.findOne(id);
    if (!content) {
      throw new NotFoundException(`Content with ID ${id} not found`);
    }
    return content;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createContentDto: CreateContentDto): ContentDto {
    return this.contentService.create(createContentDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateContentDto: UpdateContentDto): ContentDto {
    const updatedContent = this.contentService.update(id, updateContentDto);
    if (!updatedContent) {
      throw new NotFoundException(`Content with ID ${id} not found`);
    }
    return updatedContent;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): void {
    const deleted = this.contentService.remove(id);
    if (!deleted) {
      throw new NotFoundException(`Content with ID ${id} not found`);
    }
  }

  // Specialized endpoints for different content types
  @Get('type/about')
  getAboutContent(): ContentDto[] {
    return this.contentService.findByType('about');
  }

  @Get('type/team')
  getTeamContent(): ContentDto[] {
    return this.contentService.findByType('team');
  }

  @Get('type/events')
  getEventsContent(): ContentDto[] {
    return this.contentService.findByType('events');
  }
}
