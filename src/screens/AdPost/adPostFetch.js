import {ENDPOINT_GRAPHQL, gql} from "../../API"

const mutationPost = `mutation createAd($input: AdInput!){
    AdUpsert(ad: $input) {
        _id,
        title,
        description,
        price,
        address,
        images{
        _id
        }
    }
}
`


export const fetchPost = (values) => async () => {

    try {
        await gql(ENDPOINT_GRAPHQL, mutationPost, {input: values} )
    } catch (error) {
        console.error(error)
    }
}