import { S3 } from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { BucketName } from 'aws-sdk/clients/s3';

const myS3 = new S3();
//Pardon the ugly conditional.  Necessary since our String type does not allow undefined.
const bucketName: BucketName = process.env.BUCKET ? process.env.BUCKET : '';

export const handler = async (event: APIGatewayProxyEvent /*, context: Context*/): Promise<APIGatewayProxyResult> => {
  try {
    const method = event.httpMethod;

    if (method === 'GET') {
      if (event.path === '/') {
        const data = await myS3.listObjectsV2({ Bucket: bucketName }).promise();
        const body = {
          widgets: data.Contents
            ? data.Contents.map(function(e) {
                return e.Key;
              })
            : null,
        };
        return {
          statusCode: 200,
          headers: {},
          body: JSON.stringify(body),
        };
      }
    }

    // We only accept GET for now
    return {
      statusCode: 400,
      headers: {},
      body: 'We only accept GET /',
    };
  } catch (error) {
    const errorBody = error.stack || JSON.stringify(error, null, 2);
    return {
      statusCode: 400,
      headers: {},
      body: JSON.stringify(errorBody),
    };
  }
};
