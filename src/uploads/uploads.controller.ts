import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException, UseGuards, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import * as fs from 'fs';

const storage = diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = './uploads/';
    if (file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
      uploadPath += 'images';
    } else if (file.mimetype === 'application/pdf') {
      uploadPath += 'pdfs';
    } else {
      return cb(new BadRequestException('Unsupported file type'), '');
    }
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
  },
});

@ApiTags('uploads')
@Controller('uploads')
export class UploadsController {
  
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Upload an image or PDF file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', {
    storage,
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|webp|pdf)$/) && file.mimetype !== 'application/pdf') {
        return cb(new BadRequestException('Only image files (jpg, jpeg, png, webp) and PDFs are allowed!'), false);
      }
      cb(null, true);
    },
    limits: {
      fileSize: 10 * 1024 * 1024, // 10 MB limit
    }
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    return {
      filename: file.filename,
      path: file.path.replace(/\\/g, '/'),
      mimetype: file.mimetype,
      size: file.size,
    };
  }
}
