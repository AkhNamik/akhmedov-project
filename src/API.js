import { GraphQLClient } from "graphql-request"

export const ENDPOINT = "http://marketplace.asmer.fs.a-level.com.ua"

export const ENDPOINT_GRAPHQL = `${ENDPOINT}/graphql`

export const client = new GraphQLClient(ENDPOINT_GRAPHQL)

export const token = localStorage.getItem("authToken")

if (token !== null) {
  client.setHeader("Authorization", `Bearer ${token}`)
}
export const gql = (undefined, query = "", variables = {}) =>
  fetch(undefined, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables }),
  }).then((res) => res.json())

export default client
