// src/service/file/dto/upload-response.dto.ts

export class UploadResponse {
  url: string;

  constructor(url: string) {
    this.url = url;
  }
}
