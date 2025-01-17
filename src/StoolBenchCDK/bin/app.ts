#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { LambdaStack } from '../lib/lambda_stack';

const app = new cdk.App();

new LambdaStack(app, 'LambdaStack', {
  env: {
    account: '124355659927',
    region: 'us-east-1'
  }
});