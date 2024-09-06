import * as cdk from "aws-cdk-lib";
import { LambdaStackProps } from "../interfaces";
import { getCdkPropsFromCustomProps } from "../util";
import * as lambda from "aws-cdk-lib/aws-lambda";

export class LambdaStack extends cdk.Stack {
  public readonly createPlayer: lambda.Function;

  constructor(scope: cdk.App, id: string, props: LambdaStackProps) {
    super(scope, id, getCdkPropsFromCustomProps(props));

    const dynamoStack = props.dynamoStack;

    this.createPlayer = new lambda.Function(this, "CreatePlayer", {
      code: lambda.Code.fromAsset("lambdas/players"),
      handler: "create-player.handler",
      runtime: lambda.Runtime.NODEJS_20_X,
      environment: {
        PLAYERS_TABLE_NAME: dynamoStack.playersTable.tableName,
      },
    });

    //para darle permiso de escribura
    dynamoStack.playersTable.grantReadWriteData(this.createPlayer);
  }
}
