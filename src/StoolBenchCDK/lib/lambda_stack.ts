import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigw from "aws-cdk-lib/aws-apigateway";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as path from 'node:path';

export class LambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps){
    super(scope, id, props)
    const handlerPath = path.resolve(__dirname, '../../StoolBenchLambda/src');
    // console.log("Lambda Handler path:", handlerPath);

    const sbFn = new lambda.Function(this, 'StoolBenchFunction', {
        runtime: lambda.Runtime.PYTHON_3_13,
        handler: 'index.handler',
        code: lambda.Code.fromAsset(handlerPath),
    });

    const endpoint = new apigw.LambdaRestApi(this, `ApiGwEndpoint`, {
      handler: sbFn,
      proxy: false,
      restApiName: `StoolBenchRestApi`,
      defaultCorsPreflightOptions: {
        allowOrigins: apigw.Cors.ALL_ORIGINS,
        allowMethods: apigw.Cors.ALL_METHODS,
        allowHeaders: ['Content-Type', 'Authorization', 'X-Amz-Date', 'X-Api-Key', 'X-Amz-Security-Token', 'X-Amz-User-Agent'],
        allowCredentials: true,
      }
    });


    const healthResource = endpoint.root.addResource('health');
    healthResource.addMethod('GET');

    const benchResource = endpoint.root.addResource('bench');
    benchResource.addMethod('POST');

  }
}