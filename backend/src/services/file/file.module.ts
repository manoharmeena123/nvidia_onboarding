// src/service/file/file.module.ts

import { Module } from '@nestjs/common';
import { UploadController } from './file.controller';
import { FileService } from './file.service';
import { FileResolver } from './file.resolver';

@Module({
  controllers: [UploadController],
  providers: [FileResolver, FileService],
  exports: [FileService],
})
export class UploadModule {}
