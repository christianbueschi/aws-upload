import { S3Client } from '@aws-sdk/client-s3';

require('dotenv').config();

const S3_CLIENT_ENDPOINT = process.env.S3_CLIENT_ENDPOINT as string;
const S3_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY_ID as string;
const S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY as string;

export const s3Client = new S3Client({
  region: 'eu-central-2',
  endpoint: S3_CLIENT_ENDPOINT,
  credentials: {
    accessKeyId: S3_ACCESS_KEY_ID ,
    secretAccessKey: S3_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});
