import { ENDPOINT_GRAPHQL, gql } from "../../API"
const account = `
query userOne ($query: String!){
  UserFindOne(query: $query ) {
      _id
    createdAt
    avatar {
      _id
      url
    }
    login
    nick
    phones
    addresses
  }
}
`

export const fetchUser = (id) => async (dispatch) => {
  try {
    await gql(ENDPOINT_GRAPHQL, account, {
      query: JSON.stringify([{ _id: id }]),
    }).then((data) => dispatch({ type: "user/resolved", payload: data.data.UserFindOne }))
  } catch (error) {
    console.error(error)
  }
}
