import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import { StackBasicProps } from "../interfaces";
import { getCdkPropsFromCustomProps, getResourceNameWithPrefix } from "../util";

export class DynamoStack extends cdk.Stack {
  public readonly playersTable: dynamodb.Table;

  constructor(scope: Construct, id: string, props: StackBasicProps) {
    super(scope, id, getCdkPropsFromCustomProps(props));

    this.playersTable = new dynamodb.Table(this, "PlayersTable", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
      tableName: getResourceNameWithPrefix(`players-${props?.env}`),
      writeCapacity: 1,
      readCapacity: 1,
    });
  }
}
