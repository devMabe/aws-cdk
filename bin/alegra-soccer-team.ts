#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { DynamoStack } from "../lib/dynamo-stack";
import { ApiStack } from "../lib/api-stack";
import { LambdaStack } from "../lib/lambda-stack";

const app = new cdk.App();
const appName = "alegra-soccer-team";
const env = app.node.tryGetContext("env");

if (["test", "prod"].indexOf(env) === -1) {
  throw new Error("Env not supported");
}

const sharedProps = {
  account: "339712794772",
  region: "us-east-1",
  env: env,
};

const dynamoStack = new DynamoStack(app, "DynamoStack", {
  ...sharedProps,
  name: `${appName}-dynamo-${env}`,
});

const lambdaStack = new LambdaStack(app, "LambdaStack", {
  ...sharedProps,
  name: `${appName}-lambda-${env}`,
  dynamoStack: dynamoStack,
});

new ApiStack(app, "ApiStack", {
  ...sharedProps,
  name: `${appName}-api-${env}`,
  lambdaStack: lambdaStack,
});
