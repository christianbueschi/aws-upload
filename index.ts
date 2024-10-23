import fs from 'fs-extra';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from './client';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const BUCKET_NAME = process.env.BUCKET_NAME as string;

const getSignedS3Url = async () => {

  const s3Params = {
    Bucket: BUCKET_NAME,
    Key: 'test.jpeg',
    ContentType: 'image/jpeg',
  };

  const s3 = s3Client;

  const command = new PutObjectCommand(s3Params);

  try {
    const file = await fs.readFile('test.jpeg');

    try {
      const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

      try {
        await fetch(signedUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'image/jpeg',
          },
          body: file,
        });

      } catch (error) {
        throw new Error('Failed to put: ' + error);
      }

    } catch (error) {
      throw new Error('Failed to get signed url: ' + error);
    }

  } catch (error) {
    throw new Error('Failed to load file: ' + error);
  }
}

getSignedS3Url();