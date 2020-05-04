import { APIGatewayProxyHandler } from "aws-lambda";
import { driver, structure } from "gremlin";

const DriverRemoteConnection = driver.DriverRemoteConnection;
const Graph = structure.Graph;

export const hello: APIGatewayProxyHandler = async (event) => {
  const dc = new DriverRemoteConnection(
    `wss://${process.env.NEPTUNE_ENDPOINT}:8182/gremlin`,
    {}
  );
  const graph = new Graph();
  const g = graph.traversal().withRemote(dc);

  const addRes = await g.addV("hello").property("name", "justin").next();
  console.info("addRes", addRes);

  const res = await g.V().limit(1).count().next();
  console.info("res", res);

  return {
    statusCode: 200,
    body: JSON.stringify({
      message:
        "Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!",
      input: event,
    }),
  };
};
