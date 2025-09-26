export class ContentDto {
  id: string;
  title: string;
  type: string;
  content: any;
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
}

export class CreateContentDto {
  title: string;
  type: string;
  content: any;
  metadata?: any;
}

export class UpdateContentDto {
  title?: string;
  content?: any;
  metadata?: any;
}