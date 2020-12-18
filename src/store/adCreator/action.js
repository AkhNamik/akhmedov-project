import { gql } from "../../API"
import { ENDPOINT_GRAPHQL } from "../../API"
const adQuery = `
  query goods {
    AdFind(query: "[{}, {\\"sort\\":[{\\"_id\\":-1}]}]") {
      _id
      title
      owner {
        _id
        login
        nick
        phones
      }
      images {
        _id,
        url
      }
      createdAt
     
      description  
    }
  }
`
export const adDataFetched = () => async (dispatch) => {
  try {
    dispatch({ type: "data/pending" })
    await gql(ENDPOINT_GRAPHQL, adQuery).then((res) =>
    dispatch({ type: "data/resolved", payload: res.data.AdFind })
    )
  } catch (error) {
    dispatch({ type: "data/error" })
  }
}
