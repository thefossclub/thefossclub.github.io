import { Injectable } from '@nestjs/common';
import { ContentDto, CreateContentDto, UpdateContentDto } from './dto/content.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class ContentService {
  private content: ContentDto[] = [];

  // Initialize with some sample content
  constructor() {
    this.initializeSampleContent();
  }

  private initializeSampleContent() {
    const sampleContent: ContentDto[] = [
      {
        id: randomUUID(),
        title: 'About FOSS Club',
        type: 'about',
        content: {
          description: 'The FOSS Club is a community of open source enthusiasts.',
          mission: 'To promote and support open source software development.',
          vision: 'A world where open source is the standard.'
        },
        metadata: { author: 'admin', tags: ['about', 'mission'] },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        title: 'Team Members',
        type: 'team',
        content: {
          members: [
            { name: 'Ms. Eirty Telang Kapoor', role: 'Convenor', color: 'bg-orange-500' },
            { name: 'John Doe', role: 'President', color: 'bg-blue-500' },
            { name: 'Jane Smith', role: 'Vice President', color: 'bg-green-500' },
          ]
        },
        metadata: { author: 'admin', tags: ['team', 'members'] },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        title: 'Events',
        type: 'events',
        content: {
          events: [
            {
              title: 'Linux 101 Workshop',
              date: 'March 15, 2024',
              description: 'Get hands-on experience installing and configuring Linux distributions.',
              image: '/placeholder.svg?height=300&width=400',
            },
            {
              title: 'FOSS Hack Delhi-NCR',
              date: 'July 27, 2024',
              description: 'A national level FOSS hackathon conducted by the FOSS Club.',
              image: '/placeholder.svg?height=300&width=400',
            }
          ]
        },
        metadata: { author: 'admin', tags: ['events', 'workshops'] },
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    
    this.content = sampleContent;
  }

  findAll(): ContentDto[] {
    return this.content;
  }

  findByType(type: string): ContentDto[] {
    return this.content.filter(item => item.type === type);
  }

  findOne(id: string): ContentDto | undefined {
    return this.content.find(item => item.id === id);
  }

  create(createContentDto: CreateContentDto): ContentDto {
    const newContent: ContentDto = {
      id: randomUUID(),
      ...createContentDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.content.push(newContent);
    return newContent;
  }

  update(id: string, updateContentDto: UpdateContentDto): ContentDto | undefined {
    const index = this.content.findIndex(item => item.id === id);
    if (index === -1) {
      return undefined;
    }

    const updatedContent = {
      ...this.content[index],
      ...updateContentDto,
      updatedAt: new Date(),
    };

    this.content[index] = updatedContent;
    return updatedContent;
  }

  remove(id: string): boolean {
    const index = this.content.findIndex(item => item.id === id);
    if (index === -1) {
      return false;
    }

    this.content.splice(index, 1);
    return true;
  }
}
