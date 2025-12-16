import {
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';

export const ImageFilePipe = new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator({ maxSize: 10.99 * 1024 * 1024 }),
    new FileTypeValidator({ fileType: /^image\// }),
  ],
});
