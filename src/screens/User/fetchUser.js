import { ENDPOINT_GRAPHQL, gql } from "../../API"
const account = `
query userOne ($query: String!){
  UserFind(query: $query ) {
      _id
    createdAt
    login
    nick
    avatar
    phones
    addresses
  }
}
`

export const fetchUser = (values) => async () => {
 const data = await gql(ENDPOINT_GRAPHQL, account, {
    query: JSON.stringify([{ login: values.login  }]),
  }).then(res=>res)
  console.log(data, 'data')
}
