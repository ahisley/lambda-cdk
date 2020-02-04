import * as cdk from '@aws-cdk/core';
import { WidgetService } from './constructs/service-construct';
export class LambdaCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new WidgetService(this, 'Widgets');
  }
}
