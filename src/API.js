import { GraphQLClient } from "graphql-request";

export const ENDPOINT = "http://marketplace.asmer.fs.a-level.com.ua";

export const ENDPOINT_GRAPHQL = `${ENDPOINT}/graphql`;

export const client = new GraphQLClient(ENDPOINT_GRAPHQL);

export const token = localStorage.getItem("authToken");

if (token !== null) {
  console.log("token", token);
  client.setHeader("Authorization", `Bearer ${token}`);
}

export default client;
