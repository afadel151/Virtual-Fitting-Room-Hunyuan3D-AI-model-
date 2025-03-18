import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
;
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import * as multer from 'multer';
import { Model3DService } from 'src/model-3d/model-3d.service';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'clothing-items',
        resource_type: 'image', // Ensures only images are uploaded
    } as any,
});

const upload = multer({ storage });

@Controller('clothing')
export class ClothingController {
    constructor(private readonly model3DService: Model3DService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadClothing(@UploadedFile() file) {
        const imageUrl = file.path; // Cloudinary provides the direct URL

        // Call Tencent Hunyuan3D API to generate 3D model
        const modelUrl = await this.model3DService.generate3DUserModel(imageUrl);

        return {
            imageUrl, // Cloudinary image URL
            modelUrl, // 3D model URL
        };
    }
}
