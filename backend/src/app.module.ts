import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContentController } from './content/content.controller';
import { ContentService } from './content/content.service';

@Module({
  imports: [],
  controllers: [AppController, ContentController],
  providers: [AppService, ContentService],
})
export class AppModule {}
