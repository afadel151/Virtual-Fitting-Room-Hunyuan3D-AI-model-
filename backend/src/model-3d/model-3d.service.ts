import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class Model3DService {
  private readonly HUNYUAN_API_URL = 'https://hunyuan3d-api.tencent.com/generate';

  async generate3DUserModel(imageUrl: string): Promise<string> {
    try {
      const response = await axios.post(this.HUNYUAN_API_URL, { image: imageUrl });

      if (!response.data || !response.data.model_url) {
        throw new HttpException('Failed to generate 3D model', HttpStatus.BAD_REQUEST);
      }

      return response.data.model_url;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
