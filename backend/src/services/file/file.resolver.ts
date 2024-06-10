// src/service/file/file.resolver.ts

import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileService } from './file.service';
import { UploadFileDto } from './dto/upload-file.dto';
import { UploadResponse } from './dto/upload-response.dto';
import { FileEntity } from './file.entity';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';

@Resolver()
export class FileResolver {
  constructor(private readonly fileService: FileService) {}

  @Mutation(() => UploadResponse)
  async uploadFile(@Args('file') file: UploadFileDto): Promise<UploadResponse> {
    if (!file) {
      throw new BadRequestException('No file provided.');
    }

    // Check if the file is a PDF
    if (file.mimetype !== 'application/pdf') {
      throw new BadRequestException('Only PDF files are allowed.');
    }

    try {
      const fileEntity = new FileEntity(file.filename, file.mimetype, file.buffer);
      const url = await this.fileService.uploadFile(fileEntity);
      fileEntity.url = url;

      return new UploadResponse(fileEntity.url);
    } catch (error) {
      throw new InternalServerErrorException({
        status: 'error',
        error: {
          code: error?.code || 'UNKNOWN_ERROR',
          message: error.message,
        },
        data: {},
      });
    }
  }
}
