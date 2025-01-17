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
      restApiName: `StoolBenchRestApi`,
    });

  }
}