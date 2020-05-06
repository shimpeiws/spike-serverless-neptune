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

  const res = await g.V("person-1").next();
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

export const seed: APIGatewayProxyHandler = async (event) => {
  const dc = new DriverRemoteConnection(
    `wss://${process.env.NEPTUNE_ENDPOINT}:8182/gremlin`,
    {}
  );
  const graph = new Graph();
  const g = graph.traversal().withRemote(dc);

  // Node person
  g.addV("person")
    .property("id", "person-1")
    .property("name", "Liam")
    .addV("person")
    .property("id", "person-2")
    .property("name", "Emma")
    .addV("software")
    .property("id", "person-4")
    .property("id", "person-4")
    .property("name", "Noah")
    .addV("person")
    .property("id", "person-4")
    .property("name", "Olivia")
    .addV("person")
    .property("id", "person-5")
    .property("name", "William")
    .addV("person")
    .property("id", "person-6")
    .property("name", "Ava");

  // Node university
  g.addV("university")
    .property("id", "university-1")
    .property("name", "Foo University")
    .addV("university")
    .property("id", "university-2")
    .property("name", "Bar University");

  // Node university-entrance
  g.addV("university-entrance")
    .property("id", "university-entrance-1")
    .property("entered-at-year", "2011")
    .addV("university-entrance")
    .property("id", "university-entrance-2")
    .property("entered-at-year", "2011")
    .addV("university-entrance")
    .property("id", "university-entrance-3")
    .property("entered-at-year", "2015")
    .addV("university-entrance")
    .property("id", "university-entrance-4")
    .property("entered-at-year", "2015")
    .addV("university-entrance")
    .property("id", "university-entrance-5")
    .property("entered-at-year", "2020")
    .addV("university-entrance")
    .property("id", "university-entrance-6")
    .property("entered-at-year", "2020");

  // Edge enter
  g.V("person-1").addE("enter").to(g.V("university-entrance-1")).next();
  g.V("person-2").addE("enter").to(g.V("university-entrance-2")).next();
  g.V("person-3").addE("enter").to(g.V("university-entrance-3")).next();
  g.V("person-4").addE("enter").to(g.V("university-entrance-4")).next();
  g.V("person-5").addE("enter").to(g.V("university-entrance-5")).next();
  g.V("person-6").addE("enter").to(g.V("university-entrance-6"));

  // Edge university
  g.V("university-entrance-1")
    .addE("university")
    .to(g.V("university-1"))
    .next();
  g.V("university-entrance-2")
    .addE("university")
    .to(g.V("university-2"))
    .next();
  g.V("university-entrance-3")
    .addE("university")
    .to(g.V("university-1"))
    .next();
  g.V("university-entrance-4")
    .addE("university")
    .to(g.V("university-2"))
    .next();
  g.V("university-entrance-5")
    .addE("university")
    .to(g.V("university-1"))
    .next();
  g.V("university-entrance-6").addE("enter").to(g.V("university-2"));

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
