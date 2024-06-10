// src/service/file/file.entity.ts

export class FileEntity {
    filename: string;
    mimetype: string;
    buffer: Buffer;
    url?: string;
  
    constructor(filename: string, mimetype: string, buffer: Buffer, url?: string) {
      this.filename = filename;
      this.mimetype = mimetype;
      this.buffer = buffer;
      this.url = url;
    }
  }
  