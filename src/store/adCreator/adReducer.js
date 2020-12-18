const initialState = {
    data: [],
    status: "idle"
}

const adReducer = (state = initialState, action) => {
  switch (action.type) {
    case "data/pending":
      return {
        ...state,
        status: "pending",
      }
    case "data/resolved":
      return {
        ...state,
        data: action.payload,
        status: "resolved",
      }
    case "data/error":
      return {
        ...state,
        data: [],
        status: "error",
      }
    default:
      return state
  }
}

export default adReducer
