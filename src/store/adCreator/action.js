import { gql } from "../../API"
import { ENDPOINT_GRAPHQL } from "../../API"
const adQuery = `
query goods($query: String) {
  AdFind(query: $query) {
    _id
    title
    owner {
      _id
      login
      nick
      phones
      avatar {
        _id
        url
      }
    }
    images {
      _id,
      url
    }
    address
    createdAt
    price
    description  
  }
}`
export const adDataFetched = (skipCount = 0) => async (dispatch) => {
  try {
    dispatch({ type: "data/pending" })
    const { data } = await gql(ENDPOINT_GRAPHQL, adQuery, {
      query: JSON.stringify([
        {},
        {
          sort: [{ _id: -1 }],
          limit: [21],
          skip: [skipCount]
        },
      ]),
    })
    const { AdFind } = data
    dispatch({ type: "data/resolved", payload: AdFind })
  } catch (error) {
    dispatch({ type: "data/error" })
  }
}
