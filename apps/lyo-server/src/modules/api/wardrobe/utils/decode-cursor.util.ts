import { BadRequestException } from '@nestjs/common';

const decodeCursor = (cursor: string): { createdAt: Date; id: string } => {
  const decoded = Buffer.from(cursor, 'base64').toString('utf-8');
  const [createdAt, id] = decoded.split('|');

  if (!createdAt || !id) {
    throw new BadRequestException('Invalid cursor format');
  }

  const timestamp = parseInt(createdAt, 10);

  if (isNaN(timestamp)) {
    throw new BadRequestException('Invalid timestamp in cursor');
  }

  return { createdAt: new Date(timestamp), id };
};

export default decodeCursor;
