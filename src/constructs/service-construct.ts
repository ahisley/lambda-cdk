import core = require('@aws-cdk/core');
import { RestApi, LambdaIntegration } from '@aws-cdk/aws-apigateway';
import { Function, Runtime, AssetCode } from '@aws-cdk/aws-lambda';
import { Bucket } from '@aws-cdk/aws-s3';

//Reference compiled ts lambdas appropriately
const lambdaPath = `${__dirname}/../lambda`;

export class WidgetService extends core.Construct {
  constructor(scope: core.Construct, id: string) {
    super(scope, id);

    const bucket = new Bucket(this, 'WidgetStore');

    const handler = new Function(this, 'WidgetHandler', {
      runtime: Runtime.NODEJS_12_X,
      code: new AssetCode(lambdaPath),
      handler: 'widget-lambda.handler',
      environment: {
        BUCKET: bucket.bucketName,
      },
    });

    bucket.grantReadWrite(handler); // was: handler.role);

    const api = new RestApi(this, 'widgets-api', {
      restApiName: 'Widget Service',
      description: 'This service serves widgets.',
    });

    const getWidgetsIntegration = new LambdaIntegration(handler, {
      requestTemplates: { 'application/json': '{ "statusCode": "200" }' },
    });

    api.root.addMethod('GET', getWidgetsIntegration);
  }
}
