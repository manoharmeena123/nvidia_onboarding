// src/service/file/file.service.ts

import { Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';
import { FileEntity } from './file.entity';

@Injectable()
export class FileService {
  private storage: Storage;
  private bucketName: string;

  constructor() {
    this.storage = new Storage({
      keyFilename: process.env?.GOOGLE_APPLICATION_CREDENTIALS,
    });
    this.bucketName = process.env.GCLOUD_STORAGE_BUCKET;
  }

  async uploadFile(file: FileEntity): Promise<string> {
    const bucket = this.storage.bucket(this.bucketName);
    const blob = bucket.file(`${uuidv4()}-${file.filename}`);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    return new Promise((resolve, reject) => {
      blobStream
        .on('finish', () => {
          const publicUrl = `https://storage.googleapis.com/${this.bucketName}/${blob.name}`;
          resolve(publicUrl);
        })
        .on('error', (err) => {
          reject(err);
        })
        .end(file.buffer);
    });
  }
}
