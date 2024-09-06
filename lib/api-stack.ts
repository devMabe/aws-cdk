import * as cdk from "aws-cdk-lib";
import { ApiStackProps } from "../interfaces";
import { getCdkPropsFromCustomProps, getResourceNameWithPrefix } from "../util";
import * as apiGw from "aws-cdk-lib/aws-apigateway";

export class ApiStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props: ApiStackProps) {
    super(scope, id, getCdkPropsFromCustomProps(props));

    const lambdaStack = props.lambdaStack;
    const api = new apiGw.RestApi(this, "Api", {
      restApiName: getResourceNameWithPrefix(`api-${props.env}`),
      deployOptions: {
        stageName: props.env,
      },
    });

    ("/players");
    const playersResource = api.root.addResource("players");
    playersResource.addMethod(
      "POST",
      new apiGw.LambdaIntegration(lambdaStack.createPlayer)
    );

    api.root.addMethod("GET");
  }
}
