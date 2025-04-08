// infrastructure/bin/f1-store.ts
#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { F1StoreStack } from '../lib/f1-store-stack';

const app = new cdk.App();
new F1StoreStack(app, 'F1StoreStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION || 'us-east-1',
  },
  description: 'F1 Store Infrastructure',
});
