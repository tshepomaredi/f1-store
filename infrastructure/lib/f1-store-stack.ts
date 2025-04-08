// infrastructure/lib/f1-store-stack.ts
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { VpcStack } from './vpc-stack';
import { DatabaseStack } from './database-stack';
import { ApplicationStack } from './application-stack';

export class F1StoreStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create VPC
    const vpcStack = new VpcStack(this, 'VpcStack', props);

    // Create Database
    const databaseStack = new DatabaseStack(this, 'DatabaseStack', {
      vpc: vpcStack.vpc,
      ...props,
    });

    // Create Application
    const applicationStack = new ApplicationStack(this, 'ApplicationStack', {
      vpc: vpcStack.vpc,
      databaseSecretArn: databaseStack.secret.secretArn,
      ...props,
    });
  }
}
