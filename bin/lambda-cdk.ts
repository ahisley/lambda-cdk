#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { LambdaCdkStack } from '../src/lambda-cdk-stack';

const app = new cdk.App();
new LambdaCdkStack(app, 'LambdaCdkStack');
