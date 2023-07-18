import { LINK_REPO, POST_SEARCH } from "../actions/searchActions";
import { UsernameAction, UsernameState } from "../type.d";

const initialState = {
  postSearchLoading: false,
  postSearchData: false,
  postSearchError: false,
};

const searchReducer = (
  state: UsernameState = initialState,
  action: UsernameAction
) => {
  switch (action.type) {
    case POST_SEARCH:
      return {
        ...state,
        postSearchLoading: action.response.loading,
        postSearchData: action.response.data,
        postSearchError: action.response.error,
      };
    default:
      return state;
  }
};

export default searchReducer;
